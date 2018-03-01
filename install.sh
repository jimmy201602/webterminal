#!/bin/bash
set -e
centosinstall() {
    os=`rpm -q centos-release|cut -d- -f3`
	if [ $os -eq 6 ]; then
				yum clean all
				yum install centos-release-scl epel-release -y
				yum install python27 gcc python27-python-pip python27-python-setuptools python27-python-devel -y
				trap "scl enable python27 bash" SIGHUP SIGINT SIGTERM
				if [ $? -eq 0 ]; then
					yum install redis -y
					pip install pip setuptools -U -i https://pypi.douban.com/simple/
				else
					exit 1
				fi
	elif [ $os -eq 7 ]; then
				yum clean all
				yum install python-setuptools gcc python python-devel epel-release -y
				yum install redis -y
				easy_install pip
				pip install pip setuptools -U -i https://pypi.douban.com/simple/
	else
		echo "Your os version is not supported!"
		exit 1
	fi
}

ubuntuinstall() {
	if [ `which lsb_release` ]; then
		os=`lsb_release -r --short`
	else
		os=`cat /etc/lsb-release |grep DISTRIB_RELEASE|cut -d = -f2`
	fi

	if [ $os = 14.04 ]||[ $os = 17.10 ]||[ $os = 16.04 ]||[ $os = 18.04 ]; then
		apt-get update
		apt-get install -y python python-dev redis-server python-pip supervisor nginx git gcc
		pip install pip -U
		pip install setuptools -U
	else
		echo "Your os system is Ubuntu: $os"
		echo "Your os version is not supported!"
		echo "Please report this issue to github!"
		exit 1
	fi
}

commoninstall() {
    pip install -r requirements.txt -i https://pypi.douban.com/simple/
}

install() {
	#detact current user
	if [ `id -u` != 0 ];then  
		echo "Not root user! Please use with root permission user to run this script!"
		exit 1
	fi 
	
    if grep -Eqii "CentOS" /etc/issue || grep -Eq "CentOS" /etc/*-release; then
		DISTRO='CentOS'
        PM='yum'
		centosinstall
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
		ubuntuinstall
    elif grep -Eqi "Raspbian" /etc/issue || grep -Eq "Raspbian" /etc/*-release; then
        DISTRO='Raspbian'
        PM='apt'
    else
        DISTRO='unknow'
    fi
	
    echo $DISTRO;
    commoninstall
}

install
