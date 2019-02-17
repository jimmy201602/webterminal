import subprocess
import sys
import time


def main(*args):
    # print(args)
    # 192.168.2.8#22#root#pass
    # ssh://192.168.2.8#22#root#pass
    if "ssh://" in args[0][1]:
        args = args[0][1].rsplit('ssh://')[1].rsplit('#')
    else:
        args = args[0][1].rsplit('#')
    if '/' in args[0]:
        args[0] = args[0].rsplit('/')[0]
    command = "c:\\putty.exe {0} -P {1} -l {2} -pw {3}".format(*args)
    subprocess.Popen(command)


if __name__ == '__main__':
    main(sys.argv)
