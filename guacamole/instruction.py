"""
The MIT License (MIT)

Copyright (c)   2014 rescale
                2014 - 2015 Mohab Usama

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
import itertools
import six

from builtins import str as __unicode__

from .exceptions import InvalidInstruction


INST_TERM = ';'  # instruction terminator character
ARG_SEP = ','  # instruction arg separator character
ELEM_SEP = '.'  # instruction arg element separator character (e.g. 4.size)

# @TODO: enumerate instruction set


def utf8(unicode_str):
    """
    Return a utf-8 encoded string from a valid unicode string.

    :param unicode_str: Unicode string.

    :return: str
    """
    if six.PY2 and isinstance(unicode_str, __unicode__):
        return unicode_str.encode('utf-8')

    return unicode_str


class GuacamoleInstruction(object):

    def __init__(self, opcode, *args, **kwargs):
        self.opcode = opcode
        self.args = args

    @classmethod
    def load(cls, instruction):
        """
        Loads a new GuacamoleInstruction from encoded instruction string.

        :param instruction: Instruction string.

        :return: GuacamoleInstruction()
        """
        if instruction.startswith('bytearray(b'):
            # bytearray(b'4.args,8.hostname,4.port,6.domain,8.username,8.password,5.width,6.height,3.dpi,15.initial-program,11.color-depth,13.disable-audio,15.enable-printing,12.printer-name,12.enable-drive,10.drive-name,10.drive-path,17.create-drive-path,7.console,13.console-audio,13.server-layout,8.security,11.ignore-cert,12.disable-auth,10.remote-app,14.remote-app-dir,15.remote-app-args,15.static-channels,11.client-name,16.enable-wallpaper,14.enable-theming,21.enable-font-smoothing,23.enable-full-window-drag,26.enable-desktop-composition,22.enable-menu-animations,22.disable-bitmap-caching,25.disable-offscreen-caching,21.disable-glyph-caching,16.preconnection-id,18.preconnection-blob,11.enable-sftp,13.sftp-hostname,13.sftp-host-key,9.sftp-port,13.sftp-username,13.sftp-password,16.sftp-private-key,15.sftp-passphrase,14.sftp-directory,19.sftp-root-directory,26.sftp-server-alive-interval,14.recording-path,14.recording-name,24.recording-exclude-output,23.recording-exclude-mouse,22.recording-include-keys,21.create-recording-path,13.resize-method,18.enable-audio-input,9.read-only,16.gateway-hostname,12.gateway-port,14.gateway-domain,16.gateway-username,16.gateway-password,17.load-balance-info;')
            instruction = instruction.rsplit(
                "bytearray(b'")[1].rsplit("')")[0]
        # print(instruction)
        if not instruction.endswith(INST_TERM):
            raise InvalidInstruction('Instruction termination not found.')

        args = cls.decode_instruction(instruction)

        return cls(args[0], *args[1:])

    @staticmethod
    def decode_instruction(instruction):
        """
        Decode whole instruction and return list of args.
        Usually, returned arg[0] is the instruction opcode.

        example:
        >> args = decode_instruction('4.size,4.1024;')
        >> args == ['size', '1024']
        >> True

        :param instruction: Instruction string.

        :return: list
        """
        if not instruction.endswith(INST_TERM):
            raise InvalidInstruction('Instruction termination not found.')

        # Use proper encoding
        instruction = utf8(instruction)

        # Get arg size
        elems = instruction.split(ELEM_SEP, 1)

        try:
            arg_size = int(elems[0])
        except:
            # Expected ValueError
            raise InvalidInstruction(
                'Invalid arg length.' +
                ' Possibly due to missing element separator!')

        arg_str = elems[1][:arg_size]

        remaining = elems[1][arg_size:]

        args = [arg_str]

        if remaining.startswith(ARG_SEP):
            # Ignore the ARG_SEP to parse next arg.
            remaining = remaining[1:]
        elif remaining == INST_TERM:
            # This was the last arg!
            return args
        else:
            # The remaining is neither starting with ARG_SEP nor INST_TERM.
            raise InvalidInstruction(
                'Instruction arg (%s) has invalid length.' % arg_str)

        next_args = GuacamoleInstruction.decode_instruction(remaining)

        if next_args:
            args = args + next_args

        return args

    @staticmethod
    def encode_arg(arg):
        """
        Encode argument to be sent in a valid GuacamoleInstruction.

        example:
        >> arg = encode_arg('size')
        >> arg == '4.size'
        >> True

        :param arg: arg string.

        :return: str
        """
        arg_utf8 = utf8(arg)

        return ELEM_SEP.join([str(len(str(arg_utf8))), str(arg_utf8)])

    def encode(self):
        """
        Prepare the instruction to be sent over the wire.

        :return: str
        """
        instruction_iter = itertools.chain([self.opcode], self.args)

        elems = ARG_SEP.join(self.encode_arg(arg)
                             for arg in instruction_iter)

        return elems + INST_TERM

    def __str__(self):
        return self.encode()
