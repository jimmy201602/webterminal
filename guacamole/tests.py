# -*- coding: utf-8 -*-

"""
The MIT License (MIT)

Copyright (c) 2014 - 2016 Mohab Usama
"""

import six

from mock import MagicMock
from unittest import TestCase

from guacamole.client import GuacamoleClient
from guacamole.exceptions import GuacamoleError, InvalidInstruction
from guacamole.instruction import GuacamoleInstruction as Instruction


class GuacamoleClientTest(TestCase):

    def setUp(self):
        self.client = GuacamoleClient('127.0.0.1', 4822)
        # patch `send`
        self.client.send = MagicMock()
        self.client.close = MagicMock()

    def test_handshake(self):
        """
        Test successful handshake.
        """
        global step
        step = 0

        client_id = '$260d01da-779b-4ee9-afc1-c16bae885cc7'

        expected = ['select', 'size', 'audio', 'video', 'image', 'connect']

        def mock_send_instruction_handshake(instruction):
            global step
            assert instruction.opcode == expected[step]

            step += 1

        # mock and vaidate send_instruction in handshake
        self.client.send_instruction = MagicMock(
            side_effect=mock_send_instruction_handshake)
        # successful `args` response for `select` instruction
        self.client.receive = MagicMock(
            side_effect=[
                '4.args,8.hostname,4.port,6.domain,8.username;',
                '5.ready,37.%s;' % client_id
            ])

        self.client.handshake(protocol='rdp')

        self.assertTrue(self.client.connected)
        self.assertEqual(self.client.id, client_id)

    def test_handshake_invalid_protocol(self):
        """
        Test invalid handshake.
        """
        with self.assertRaises(GuacamoleError):
            self.client.handshake(protocol='invalid')

    def test_handshake_protocol_failure(self):
        """
        Test invalid protocol instruction.
        """
        # expected `args`
        self.client.receive = MagicMock(
            side_effect=['7.invalid,8.hostname,4.port,6.domain,8.username;'])

        with self.assertRaises(GuacamoleError):
            self.client.handshake(protocol='rdp')

    def test_handshake_invalid_instruction(self):
        """
        Test invalid instruction.
        """
        self.client.receive = MagicMock()
        self.client.receive.return_value = ''

        with self.assertRaises(InvalidInstruction):
            self.client.handshake(protocol='rdp')

    def test_handshake_invalid_instruction_args(self):
        """
        Test invalid instruction.
        """
        # invalid arg length
        self.client.receive = MagicMock()
        self.client.receive.return_value = '5.args;'

        with self.assertRaises(InvalidInstruction):
            self.client.handshake(protocol='rdp')

    def test_handshake_invalid_instruction_termination(self):
        """
        Test invalid instruction.
        """
        # invalid instruction terminator `;`
        self.client.receive = MagicMock(
            side_effect=['4.args,8.hostname,4.port,6.domain,8.username'])

        with self.assertRaises(InvalidInstruction):
            self.client.handshake(protocol='rdp')


class GuacamoleInstructionTest(TestCase):

    def setUp(self):
        self.u_arg = u'مهاب'
        self.u_arg_utf8 = self.u_arg.encode(
            'utf-8') if six.PY2 else self.u_arg
        self.u_arg_len = len(self.u_arg_utf8)

    def test_instruction_valid_encode(self):
        """
        Test valid instruction encoding.
        """
        instruction_str = '4.args,8.hostname,4.port,4.1984;'
        instruction_opcode = 'args'
        instruction_args = ('hostname', 'port', 1984)

        instruction = Instruction('args', 'hostname', 'port', 1984)

        self.assertEqual(instruction_str, instruction.encode())
        self.assertEqual(instruction_opcode, instruction.opcode)
        self.assertEqual(instruction_args, instruction.args)

    def test_instruction_valid_decode(self):
        """
        Test valid instruction decoding.
        """
        instruction_str = '4.args,8.hostname,4.port,4.1984;'

        instruction_opcode = 'args'
        instruction_args = ('hostname', 'port', '1984')

        instruction = Instruction.load(instruction_str)

        self.assertEqual(instruction_str, instruction.encode())
        self.assertEqual(instruction_opcode, instruction.opcode)
        self.assertEqual(instruction_args, instruction.args)

    def test_instruction_valid_encode_unicode(self):
        """
        Test valid instruction encoding with unicode characters.
        """
        # instruction str for validation!
        instruction_str = '4.args,8.hostname,%s.%s;' %\
            (self.u_arg_len, self.u_arg_utf8)

        instruction_opcode = 'args'
        instruction_args = ('hostname', self.u_arg)

        # passing a unicode arg!
        instruction = Instruction('args', 'hostname', self.u_arg)

        self.assertEqual(instruction_opcode, instruction.opcode)
        self.assertEqual(instruction_args, instruction.args)

        # all args should be utf_8 after instruction.encode()
        self.assertEqual(instruction_str, instruction.encode())

    def test_instruction_valid_decode_unicode(self):
        """
        Test valid instruction decoding with unicode characters.
        """
        # messing up by passing unicode instruction (with valid arg length!)
        instruction_str_u = u'4.args,8.hostname,%s.%s;' %\
            (self.u_arg_len, self.u_arg)

        # instruction str for validation!
        instruction_str = '4.args,8.hostname,%s.%s;' %\
            (self.u_arg_len, self.u_arg_utf8)

        instruction_opcode = 'args'
        instruction_args = ('hostname', self.u_arg_utf8)

        # Instruction.load should handle unicode string!
        instruction = Instruction.load(instruction_str_u)

        self.assertEqual(instruction_str, instruction.encode())
        self.assertEqual(instruction_opcode, instruction.opcode)
        self.assertEqual(instruction_args, instruction.args)

    def test_instruction_valid_encode_with_protocol_chars(self):
        """
        Test valid instruction encoding with arg containing
        protocol characters.
        """
        # arg includes ARG_SEP, ELEM_SEP, INST_TERM and a white space.
        arg_protocol_chars = 'p,.; t'
        instruction_str = '4.args,8.hostname,%s.%s;' %\
            (len(arg_protocol_chars), arg_protocol_chars)

        instruction_opcode = 'args'
        instruction_args = ('hostname', arg_protocol_chars)

        instruction = Instruction('args', 'hostname', arg_protocol_chars)

        self.assertEqual(instruction_str, instruction.encode())
        self.assertEqual(instruction_opcode, instruction.opcode)
        self.assertEqual(instruction_args, instruction.args)

    def test_instruction_valid_decode_with_protocol_chars(self):
        """
        Test valid instruction decoding with arg containing
        protocol characters.
        """
        # arg includes ARG_SEP, ELEM_SEP, INST_TERM and a white space.
        arg_protocol_chars = 'p,.; t'
        instruction_str = '4.args,8.hostname,%s.%s;' %\
            (len(arg_protocol_chars), arg_protocol_chars)

        instruction_opcode = 'args'
        instruction_args = ('hostname', arg_protocol_chars)

        instruction = Instruction.load(instruction_str)

        self.assertEqual(instruction_str, instruction.encode())
        self.assertEqual(instruction_opcode, instruction.opcode)
        self.assertEqual(instruction_args, instruction.args)

    def test_instruction_invalid_termination(self):
        """
        Instruction with invalid terminator.
        """
        instruction_str = '4.args,8.hostname,4.port'

        with self.assertRaises(InvalidInstruction):
            Instruction.load(instruction_str)

    def test_instruction_invalid_arg_length(self):
        """
        Instruction with invalid arg length.
        """
        instruction_str = '5.args,8.hostname,4.port;'

        with self.assertRaises(InvalidInstruction):
            Instruction.load(instruction_str)

    def test_instruction_invalid_arg_length_large(self):
        """
        Instruction with invalid large arg length.
        """
        instruction_str = '1000.args,8.hostname,4.port;'

        with self.assertRaises(InvalidInstruction):
            Instruction.load(instruction_str)

    def test_instruction_invalid_element_separator(self):
        """
        Instruction with invalid element separator.
        """
        instruction_str = '3args,8.hostname,4.port;'

        with self.assertRaises(InvalidInstruction):
            Instruction.load(instruction_str)

    def test_instruction_invalid_arg_separator(self):
        """
        Instruction with invalid arg separator.
        """
        instruction_str = '3.args8.hostname,4.port;'

        with self.assertRaises(InvalidInstruction):
            Instruction.load(instruction_str)
