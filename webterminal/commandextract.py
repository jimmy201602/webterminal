import re

class CommandDeal(object):

    @staticmethod
    def remove_obstruct_char(cmd_str):
        '''delete some special control delimiter'''
        control_char = re.compile(r'\x07 | \x1b\[1P | \r ', re.X)
        cmd_str = control_char.sub('',cmd_str.strip())
        patch_char = re.compile('\x08\x1b\[C') #'delete left and right delete'
        while patch_char.search(cmd_str):
            cmd_str = patch_char.sub('', cmd_str.rstrip())
        return cmd_str
    
    @staticmethod
    def deal_backspace(match_str, result_command, pattern_str, backspace_num):
        '''
        deal with delete key
        '''
        if backspace_num > 0:
            if backspace_num > len(result_command):
                result_command += pattern_str
                result_command = result_command[0:-backspace_num]
            else:
                result_command = result_command[0:-backspace_num]
                result_command += pattern_str
        del_len = len(match_str)-3
        if del_len > 0:
            result_command = result_command[0:-del_len]
        return result_command, len(match_str)
    
    @staticmethod
    def deal_replace_char(match_str,result_command,backspace_num):
        '''
        deal and replace command
        '''
        str_lists = re.findall(r'(?<=\x1b\[1@)\w',match_str)
        tmp_str =''.join(str_lists)
        result_command_list = list(result_command)
        if len(tmp_str) > 1:
            result_command_list[-backspace_num:-(backspace_num-len(tmp_str))] = tmp_str
        elif len(tmp_str) > 0:
            if result_command_list[-backspace_num] == ' ':
                result_command_list.insert(-backspace_num, tmp_str)
            else:
                result_command_list[-backspace_num] = tmp_str
        result_command = ''.join(result_command_list)
        return result_command, len(match_str)
    
    def deal_command(self, str_r):
        """
            deal with command special key
        """
        str_r = self.remove_obstruct_char(str_r)
    
        result_command = ''             #final result
        backspace_num = 0               # cursor num
        reach_backspace_flag = False    # detect if there is cursor key
        pattern_str = ''
        while str_r:
            tmp = re.match(r'\s*\w+\s*', str_r)
            if tmp:
                str_r = str_r[len(str(tmp.group(0))):]
                if reach_backspace_flag:
                    pattern_str += str(tmp.group(0))
                    continue
                else:
                    result_command += str(tmp.group(0))
                    continue
    
            tmp = re.match(r'\x1b\[K[\x08]*', str_r)
            if tmp:
                result_command, del_len = self.deal_backspace(str(tmp.group(0)), result_command, pattern_str, backspace_num)
                reach_backspace_flag = False
                backspace_num = 0
                pattern_str = ''
                str_r = str_r[del_len:]
                continue
    
            tmp = re.match(r'\x08+', str_r)
            if tmp:
                str_r = str_r[len(str(tmp.group(0))):]
                if len(str_r) != 0:
                    if reach_backspace_flag:
                        result_command = result_command[0:-backspace_num] + pattern_str
                        pattern_str = ''
                    else:
                        reach_backspace_flag = True
                    backspace_num = len(str(tmp.group(0)))
                    continue
                else:
                    break
    
            tmp = re.match(r'(\x1b\[1@\w)+', str_r)                           #deal with replace command
            if tmp:
                result_command,del_len = self.deal_replace_char(str(tmp.group(0)), result_command, backspace_num)
                str_r = str_r[del_len:]
                backspace_num = 0
                continue
    
            if reach_backspace_flag:
                pattern_str += str_r[0]
            else:
                result_command += str_r[0]
            str_r = str_r[1:]
    
        if backspace_num > 0:
            result_command = result_command[0:-backspace_num] + pattern_str
    
        result_command = self.remove_control_char(result_command)
        return result_command
    
    def remove_control_char(self, result_command):    
        """
        deal with special key
        """
        control_char = re.compile(r"""
                                          \x1b[ #%()*+\-.\/]. |
                                          \r |                                               #enter key(CR)
                                          (?:\x1b\[|\x9b) [ -?]* [@-~] |                     #enter control key(CSI)... Cmd
                                          (?:\x1b\]|\x9d) .*? (?:\x1b\\|[\a\x9c]) | \x07 |   #enter system control key(OSC)...terminate key(ST|BEL)
                                          (?:\x1b[P^_]|[\x90\x9e\x9f]) .*? (?:\x1b\\|\x9c) | #enter serial communication key(DCS|PM|APC)...terminate key(ST)
                                          \x1b.                                              #special key
                                          [\x80-\x9f] | (?:\x1b\]0.*) | \[.*@.*\][\$#] | (.*mysql>.*)      #enter every special key
                                          """, re.X)
        result_command = control_char.sub('', result_command.strip())
        return result_command.decode('utf8',"ignore")