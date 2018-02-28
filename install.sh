#!/bin/bash
set -e
function centos6install() {
    os=`rpm -q centos-release|cut -d- -f3`
	if [[ $os -eq 6 ]]; then
				yum clean all
				yum install centos-release-scl -y
				yum install python27 gcc -y
				scl enable python27 bash
				pip install setuptools -U
				pip install pip -U
				pip install -r requirements.txt
	elif [[ $os -eq 7 ]]; then
			apt-get install smartmontools dmidecode python-pip python-dev
	else
		echo "your os version is not supported!"
		exit 0
	fi
}

function install() {
    if grep -Eqii "CentOS" /etc/issue || grep -Eq "CentOS" /etc/*-release; then
		    DISTRO='CentOS'
        PM='yum'
		centos6install
    elif grep -Eqi "Red Hat Enterprise Linux Server" /etc/issue || grep -Eq "Red Hat Enterprise Linux Server" /etc/*-release; then
        DISTRO='RHEL'
        PM='yum'
    elif grep -Eqi "Aliyun" /etc/issue || grep -Eq "Aliyun" /etc/*-release; then
        DISTRO='Aliyun'
        PM='yum'
    elif grep -Eqi "Fedora" /etc/issue || grep -Eq "Fedora" /etc/*-release; then
        DISTRO='Fedora'
        PM='yum'
    elif grep -Eqi "Debian" /etc/issue || grep -Eq "Debian" /etc/*-release; then
        DISTRO='Debian'
        PM='apt'
    elif grep -Eqi "Ubuntu" /etc/issue || grep -Eq "Ubuntu" /etc/*-release; then
        DISTRO='Ubuntu'
        PM='apt'
    elif grep -Eqi "Raspbian" /etc/issue || grep -Eq "Raspbian" /etc/*-release; then
        DISTRO='Raspbian'
        PM='apt'
    else
        DISTRO='unknow'
    fi
    echo $DISTRO;
}

install
