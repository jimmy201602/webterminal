import errno
import os
import paramiko
from paramiko.sftp import SFTP_OP_UNSUPPORTED
import sys
from common.models import Credential, ServerInfor, Log, CommandLog
try:
    from StringIO import StringIO
except ImportError:
    from io import StringIO
try:
    from django.utils.encoding import smart_unicode
except ImportError:
    from django.utils.encoding import smart_text as smart_unicode
from webterminal.encrypt import PyCrypt
from paramiko.sftp_attr import SFTPAttributes
import socket


class SftpHandle(paramiko.SFTPServerInterface):

    server = None
    client = None

    def __init__(self, server, *largs, **kwargs):
        """
        Create a new SFTPServerInterface object.  This method does nothing by
        default and is meant to be overridden by subclasses.

        :param .ServerInterface server:
            the server object associated with this channel and SFTP subsystem
        """
        self.server = server
        super(SftpHandle, self).__init__(server, *largs, **kwargs)

    def session_started(self):
        """
        The SFTP server session has just started.  This method is meant to be
        overridden to perform any necessary setup before handling callbacks
        from SFTP operations.
        """
        if not self.sftpauth(self.server):
            'auth failed'
            if self.server:
                self.server.close()
            return

    def session_ended(self):
        """
        The SFTP server session has just ended, either cleanly or via an
        exception.  This method is meant to be overridden to perform any
        necessary cleanup before this `.SFTPServerInterface` object is
        destroyed.
        """
        super(SftpHandle, self).session_ended()
        self.server.event._Event__flag = False
        self.client.close()
        self.client.sock.close()
        self.ssh.close()

    def open(self, path, flags, attr):
        """
        Open a file on the server and create a handle for future operations
        on that file.  On success, a new object subclassed from `.SFTPHandle`
        should be returned.  This handle will be used for future operations
        on the file (read, write, etc).  On failure, an error code such as
        ``SFTP_PERMISSION_DENIED`` should be returned.

        ``flags`` contains the requested mode for opening (read-only,
        write-append, etc) as a bitset of flags from the ``os`` module:

            - ``os.O_RDONLY``
            - ``os.O_WRONLY``
            - ``os.O_RDWR``
            - ``os.O_APPEND``
            - ``os.O_CREAT``
            - ``os.O_TRUNC``
            - ``os.O_EXCL``

        (One of ``os.O_RDONLY``, ``os.O_WRONLY``, or ``os.O_RDWR`` will always
        be set.)

        The ``attr`` object contains requested attributes of the file if it
        has to be created.  Some or all attribute fields may be missing if
        the client didn't specify them.

        .. note:: The SFTP protocol defines all files to be in "binary" mode.
            There is no equivalent to Python's "text" mode.

        :param str path:
            the requested path (relative or absolute) of the file to be opened.
        :param int flags:
            flags or'd together from the ``os`` module indicating the requested
            mode for opening the file.
        :param .SFTPAttributes attr:
            requested attributes of the file if it is newly created.
        :return: a new `.SFTPHandle` or error code.
        """
        print('open')
        path = self.canonicalize(path)
        if (flags & os.O_CREAT) and (attr is not None):
            attr._flags &= ~attr.FLAG_PERMISSIONS
            paramiko.SFTPServer.set_file_attr(path, attr)
        if flags & os.O_WRONLY:
            if flags & os.O_APPEND:
                fstr = 'ab'
            else:
                fstr = 'wb'
        elif flags & os.O_RDWR:
            if flags & os.O_APPEND:
                fstr = 'a+b'
            else:
                fstr = 'r+b'
        else:
            # O_RDONLY (== 0)
            fstr = 'rb'
        try:
            f = self.client.open(path, fstr)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        fobj = paramiko.SFTPHandle(flags)
        fobj.filename = path
        fobj.readfile = f
        fobj.writefile = f
        return fobj

    def list_folder(self, path):
        """
        Return a list of files within a given folder.  The ``path`` will use
        posix notation (``"/"`` separates folder names) and may be an absolute
        or relative path.

        The list of files is expected to be a list of `.SFTPAttributes`
        objects, which are similar in structure to the objects returned by
        ``os.stat``.  In addition, each object should have its ``filename``
        field filled in, since this is important to a directory listing and
        not normally present in ``os.stat`` results.  The method
        `.SFTPAttributes.from_stat` will usually do what you want.

        In case of an error, you should return one of the ``SFTP_*`` error
        codes, such as ``SFTP_PERMISSION_DENIED``.

        :param str path: the requested path (relative or absolute) to be
            listed.
        :return:
            a list of the files in the given folder, using `.SFTPAttributes`
            objects.

        .. note::
            You should normalize the given ``path`` first (see the `os.path`
            module) and check appropriate permissions before returning the list
            of files.  Be careful of malicious clients attempting to use
            relative paths to escape restricted folders, if you're doing a
            direct translation from the SFTP server path to your local
            filesystem.
        """
        path = self.canonicalize(path)
        try:
            return self.client.listdir_attr(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)

    def stat(self, path):
        """
        Return an `.SFTPAttributes` object for a path on the server, or an
        error code.  If your server supports symbolic links (also known as
        "aliases"), you should follow them.  (`lstat` is the corresponding
        call that doesn't follow symlinks/aliases.)

        :param str path:
            the requested path (relative or absolute) to fetch file statistics
            for.
        :return:
            an `.SFTPAttributes` object for the given file, or an SFTP error
            code (like ``SFTP_PERMISSION_DENIED``).
        """
        path = self.canonicalize(path)
        try:
            return self.client.stat(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)

    def lstat(self, path):
        """
        Return an `.SFTPAttributes` object for a path on the server, or an
        error code.  If your server supports symbolic links (also known as
        "aliases"), you should not follow them -- instead, you should
        return data on the symlink or alias itself.  (`stat` is the
        corresponding call that follows symlinks/aliases.)

        :param str path:
            the requested path (relative or absolute) to fetch file statistics
            for.
        :type path: str
        :return:
            an `.SFTPAttributes` object for the given file, or an SFTP error
            code (like ``SFTP_PERMISSION_DENIED``).
        """
        print('lstat', path)
        path = self.canonicalize(path)
        try:
            return self.client.lstat(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)

    def remove(self, path):
        """
        Delete a file, if possible.

        :param str path:
            the requested path (relative or absolute) of the file to delete.
        :return: an SFTP error code `int` like ``SFTP_OK``.
        """
        path = self.canonicalize(path)
        try:
            self.client.remove(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        return paramiko.SFTP_OK

    def rename(self, oldpath, newpath):
        """
        Rename (or move) a file.  The SFTP specification implies that this
        method can be used to move an existing file into a different folder,
        and since there's no other (easy) way to move files via SFTP, it's
        probably a good idea to implement "move" in this method too, even for
        files that cross disk partition boundaries, if at all possible.

        .. note:: You should return an error if a file with the same name as
            ``newpath`` already exists.  (The rename operation should be
            non-desctructive.)

        .. note::
            This method implements 'standard' SFTP ``RENAME`` behavior; those
            seeking the OpenSSH "POSIX rename" extension behavior should use
            `posix_rename`.

        :param str oldpath:
            the requested path (relative or absolute) of the existing file.
        :param str newpath: the requested new path of the file.
        :return: an SFTP error code `int` like ``SFTP_OK``.
        """
        oldpath = self.canonicalize(oldpath)
        newpath = self.canonicalize(newpath)
        try:
            self.client.rename(oldpath, newpath)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        return paramiko.SFTP_OK

    def posix_rename(self, oldpath, newpath):
        """
        Rename (or move) a file, following posix conventions. If newpath
        already exists, it will be overwritten.

        :param str oldpath:
            the requested path (relative or absolute) of the existing file.
        :param str newpath: the requested new path of the file.
        :return: an SFTP error code `int` like ``SFTP_OK``.

        :versionadded: 2.2
        """
        print('posix rename')
        oldpath = self.canonicalize(oldpath)
        newpath = self.canonicalize(newpath)
        return self.client.posix_rename(oldpath, newpath)

    def mkdir(self, path, attr):
        """
        Create a new directory with the given attributes.  The ``attr``
        object may be considered a "hint" and ignored.

        The ``attr`` object will contain only those fields provided by the
        client in its request, so you should use ``hasattr`` to check for
        the presence of fields before using them.  In some cases, the ``attr``
        object may be completely empty.

        :param str path:
            requested path (relative or absolute) of the new folder.
        :param .SFTPAttributes attr: requested attributes of the new folder.
        :return: an SFTP error code `int` like ``SFTP_OK``.
        """
        path = self.canonicalize(path)
        try:
            if attr.st_mode:
                self.client.mkdir(path, attr.st_mode)
            else:
                self.client.mkdir(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        return paramiko.SFTP_OK

    def rmdir(self, path):
        """
        Remove a directory if it exists.  The ``path`` should refer to an
        existing, empty folder -- otherwise this method should return an
        error.

        :param str path:
            requested path (relative or absolute) of the folder to remove.
        :return: an SFTP error code `int` like ``SFTP_OK``.
        """
        path = self.canonicalize(path)
        try:
            self.client.rmdir(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        return paramiko.SFTP_OK

    def chattr(self, path, attr):
        """
        Change the attributes of a file.  The ``attr`` object will contain
        only those fields provided by the client in its request, so you
        should check for the presence of fields before using them.

        :param str path:
            requested path (relative or absolute) of the file to change.
        :param attr:
            requested attributes to change on the file (an `.SFTPAttributes`
            object)
        :return: an error code `int` like ``SFTP_OK``.
        """
        # print('chattr', attr.__dict__)
        # attr {'st_gid': None, 'st_atime': None, 'st_size': None, 'st_uid': None, 'attr': {}, '_flags': 4, 'st_mtime': None, 'st_mode': 49375}
        path = self.canonicalize(path)
        try:
            if attr._flags & attr.FLAG_PERMISSIONS:
                self.client.chmod(path, attr.st_mode)
            if attr._flags & attr.FLAG_UIDGID:
                self.client.chown(path, attr.st_uid, attr.st_gid)
            if attr._flags & attr.FLAG_AMTIME:
                self.client.utime(path, (attr.st_atime, attr.st_mtime))
            if attr._flags & attr.FLAG_SIZE:
                with open(path, "w+") as f:
                    f.truncate(attr.st_size)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        return paramiko.SFTP_OK

    def canonicalize(self, path):
        """
        Return the canonical form of a path on the server.  For example,
        if the server's home folder is ``/home/foo``, the path
        ``"../betty"`` would be canonicalized to ``"/home/betty"``.  Note
        the obvious security issues: if you're serving files only from a
        specific folder, you probably don't want this method to reveal path
        names outside that folder.

        You may find the Python methods in ``os.path`` useful, especially
        ``os.path.normpath`` and ``os.path.realpath``.

        The default implementation returns ``os.path.normpath('/' + path)``.
        """
        if os.path.isabs(path):
            out = os.path.normpath(path)
        else:
            out = os.path.normpath("/" + path)
        if sys.platform == "win32":
            # on windows, normalize backslashes to sftp/posix format
            out = out.replace("\\", "/")
        return out

    def readlink(self, path):
        """
        Return the target of a symbolic link (or shortcut) on the server.
        If the specified path doesn't refer to a symbolic link, an error
        should be returned.

        :param str path: path (relative or absolute) of the symbolic link.
        :return:
            the target `str` path of the symbolic link, or an error code like
            ``SFTP_NO_SUCH_FILE``.
        """
        print('read link')
        path = self.canonicalize(path)
        try:
            symlink = self.client.readlink(path)
        except OSError as e:
            return paramiko.SFTPServer.convert_errno(e.errno)
        return symlink

    def symlink(self, target_path, path):
        """
        Create a symbolic link on the server, as new pathname ``path``,
        with ``target_path`` as the target of the link.

        :param str target_path:
            path (relative or absolute) of the target for this new symbolic
            link.
        :param str path:
            path (relative or absolute) of the symbolic link to create.
        :return: an error code `int` like ``SFTP_OK``.
        """
        print('symlink')
        target_path = self.canonicalize(target_path)
        path = self.canonicalize(path)
        return self.client.symlink(target_path, path)

    def sftpauth(self, server):
        # ssh auth
        ssh = paramiko.SSHClient()
        self.ssh = ssh
        ssh.set_missing_host_key_policy(
            paramiko.AutoAddPolicy())

        data = ServerInfor.objects.get(id=server.serverid)
        port = None
        method = None
        username = None
        key = None
        password = None
        request_conn_username_exist = False
        for credential in data.credentials.all():
            if credential.username == server.request_conn_username:
                request_conn_username_exist = True
        if not request_conn_username_exist:
            # detect request connection user is not exist
            return False
        for credential in data.credentials.all():
            if credential.username == server.request_conn_username:
                port = credential.port
                method = credential.method
                username = credential.username
                if method == 'password':
                    password = credential.password
                else:
                    password = credential.password
                    key = credential.key
        if not port or not username or not method:
            return False
        ip = data.ip
        try:
            if method == 'password':
                ssh.connect(ip, port=port, username=username,
                            password=password, timeout=3)
            else:
                private_key = StringIO(key)
                if 'RSA' in key:
                    private_key = paramiko.RSAKey.from_private_key(
                        private_key,password=password)
                elif 'DSA' in key:
                    private_key = paramiko.DSSKey.from_private_key(
                        private_key,password=password)
                elif 'EC' in key:
                    private_key = paramiko.ECDSAKey.from_private_key(
                        private_key,password=password)
                elif 'OPENSSH' in key:
                    private_key = paramiko.Ed25519Key.from_private_key(
                        private_key,password=password)
                else:
                    print('unsupported key')
                ssh.connect(
                    ip, port=port, username=username, pkey=private_key, timeout=3)
            # record log
            # channelid = smart_unicode(PyCrypt.random_pass(32))
            # audit_log = Log.objects.create(user=User.objects.get(
                # username=server.request_http_username), server=data, channel=channelid, width=180, height=40)
            # server.channelid = str(audit_log.log)
            # audit_log.save()
            self.client = ssh.open_sftp()
            return True
        except socket.timeout:
            print('socket timeout')
            return False
