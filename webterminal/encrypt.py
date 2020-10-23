# -*- coding: utf-8 -*-
from Crypto.Cipher import AES
import hashlib
from binascii import b2a_hex, a2b_hex
import random


class PyCrypt(object):
    """
    This class used to encrypt and decrypt password.
    """

    def __init__(self, key):
        self.key = key
        self.mode = AES.MODE_CBC

    @staticmethod
    def random_pass(length, especial=False):
        """
        random password
        """
        salt_key = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
        symbol = '!@$%^&*()_'
        salt_list = []
        if especial:
            for i in range(length - 4):
                salt_list.append(random.choice(salt_key))
            for i in range(4):
                salt_list.append(random.choice(symbol))
        else:
            for i in range(length):
                salt_list.append(random.choice(salt_key))
        salt = ''.join(salt_list)
        return salt

    @staticmethod
    def md5_crypt(string):
        """
        md5 encrypt method
        """
        return hashlib.new("md5", string).hexdigest()

    # @staticmethod
    # def gen_sha512(salt, password):
        # """
        # generate sha512 format password
        # """
        # return crypt.crypt(password, '$6$%s$' % salt)

    def encrypt(self, content=None, length=32):
        """
        encrypt gen password
        """
        content = content.encode('utf8', 'ignore')

        cryptor = AES.new(self.key, self.mode, '8122ca7d906ad5e1')
        try:
            count = len(content)
        except TypeError:
            raise Exception('Encrypt password error, TYpe error.')

        add = (length - (count % length))
        if isinstance(content, bytes):
            content = content.decode('utf8', 'ignore')
        content += ('\0' * add)
        cipher_text = cryptor.encrypt(content)
        return b2a_hex(cipher_text)

    def decrypt(self, text):
        """
        decrypt pass base the same key
        """
        cryptor = AES.new(self.key, self.mode, b'8122ca7d906ad5e1')
        try:
            plain_text = cryptor.decrypt(a2b_hex(text))
        except TypeError:
            # raise ServerError('Decrypt password error, TYpe error.')
            plain_text = ""
        return plain_text.decode('utf8', 'ignore').rstrip('\0')
