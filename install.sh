#!/bin/bash
set -e
centosinstall() {
    Version=`rpm -q centos-release|cut -d- -f3`
	if [ $Version -eq 6 ]; then
				installhint
				yum clean all
				yum install centos-release-scl epel-release -y
				yum install python27 gcc python27-python-pip python27-python-setuptools python27-python-devel -y
				trap "scl enable python27 bash" SIGHUP SIGINT SIGTERM
				if [ $? -eq 0 ]; then
					yum install redis nginx -y
					pip install pip setuptools -U -i https://pypi.douban.com/simple/
				else
					exit 1
				fi
	elif [ $Version -eq 7 ]; then
				installhint
				yum clean all
				yum install python-setuptools gcc python python-devel epel-release -y
				yum install redis nginx -y
				easy_install pip
				pip install pip setuptools -U -i https://pypi.douban.com/simple/
	else
		notsupport
	fi
}

ubuntuinstall() {
	if [ `which lsb_release` ]; then
		Version=`lsb_release -r --short`
	else
		Version=`cat /etc/lsb-release |grep DISTRIB_RELEASE|cut -d = -f2`
	fi

	if [ $Version = 14.04 ]||[ $Version = 17.10 ]||[ $Version = 16.04 ]||[ $Version = 18.04 ]; then
		installhint
		apt-get update
		apt-get install -y python python-dev redis-server python-pip supervisor nginx gcc
		pip install pip -U
		pip install setuptools -U
	else
		notsupport
	fi
}

fedorainstall() {
	Version=`cat /etc/os-release |grep VERSION_ID|cut -d = -f2`
	if [ $Version = 25 ]||[ $Version = 26 ]||[ $Version = 27 ]; then
		installhint
		yum clean all
		yum install python-setuptools gcc python python-devel redis nginx redhat-rpm-config -y
		pip install pip -U
		pip install setuptools -U
	else
		notsupport
	fi
}

commoninstall() {
    pip install -r requirements.txt -i https://pypi.douban.com/simple/
}

notsupport() {
	echo "Your os system is $DISTRO: $Version"
	echo "Your os version is not supported!"
	echo "Please report this issue to github!"
	exit 1
}

installhint() {
	echo "Your os system is $DISTRO: $Version"
	echo "Now begin to start install webterminal......"
	echo "Now begin to install python redis......"
	echo "It will spent serval minutes, Please waitting........."
}

install() {
	#detact current user
	if [ `id -u` != 0 ];then  
		echo "Not root user! Please use with root permission user to run this script!"
		exit 1
	fi
		
    if grep -Eqii "CentOS" /etc/issue || grep -Eq "CentOS" /etc/*-release; then
		centosinstall
    elif grep -Eqi "Red Hat Enterprise Linux Server" /etc/issue || grep -Eq "Red Hat Enterprise Linux Server" /etc/*-release; then
        DISTRO='RHEL'
        PM='yum'
		notsupport
    elif grep -Eqi "Aliyun" /etc/issue || grep -Eq "Aliyun" /etc/*-release; then
        DISTRO='Aliyun'
        PM='yum'
		notsupport
    elif grep -Eqi "Fedora" /etc/issue || grep -Eq "Fedora" /etc/*-release; then
        DISTRO='Fedora'
        PM='yum'
		fedorainstall
    elif grep -Eqi "Debian" /etc/issue || grep -Eq "Debian" /etc/*-release; then
        DISTRO='Debian'
        PM='apt'
		notsupport
    elif grep -Eqi "Ubuntu" /etc/issue || grep -Eq "Ubuntu" /etc/*-release; then
        DISTRO='Ubuntu'
        PM='apt'
		ubuntuinstall
    elif grep -Eqi "Raspbian" /etc/issue || grep -Eq "Raspbian" /etc/*-release; then
        DISTRO='Raspbian'
        PM='apt'
		notsupport
    else
        DISTRO='unknow'
		notsupport
    fi
	
    commoninstall
}

install
