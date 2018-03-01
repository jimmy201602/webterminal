#!/bin/bash
set -e
centosinstall() {
    Version=`rpm -q centos-release|cut -d- -f3`
	if [ $Version -eq 6 ]; then
				installhint
				yum clean all
				yum install centos-release-scl epel-release -y
				yum install python27 gcc python27-python-pip python27-python-setuptools python27-python-devel mysql-devel -y
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
				yum install python-setuptools gcc python python-devel epel-release mysql-devel -y
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
		apt-get install -y python python-dev redis-server python-pip supervisor nginx gcc libmysqlclient-dev
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
		yum install python-setuptools gcc python python-devel redis nginx redhat-rpm-config mysql-devel -y
		pip install pip -U
		pip install setuptools -U
	else
		notsupport
	fi
}

commoninstall() {
    pip install -r requirements.txt -i https://pypi.douban.com/simple/
}

databaseinit() {
	echo "####install database####"
	echo -e "1:sqlite3\n2:mysql"
	read -p "If you just want to test this project recommend you use sqlite database[1/2]:" dbtype
	
	if [ ! $dbtype ]; then
		case $db1 in
			1)
				sed -i "s/engine = mysql/mysql = sqlite/g" webterminal.conf
				;;
			2)
				sed -i "s/engine = mysql/mysql = mysql/g" webterminal.conf
				;;
			*)
				exit 1                    
				;;
		esac
	fi
	
	if [ $dbtype = 2 ]; then
		read -p "do you want to create a new mysql database?[yes/no]:" db1
		if [ ! $db1 ]
		then
		db1=yes
		fi
		
		case $db1 in
			yes|y|Y|YES)  
				echo "installing a new mariadb...."
				
				if [ $DISTRO = Ubuntu ]; then
					apt-get install -y mysql-server
				elif [ $DISTRO = CentOS ]||[ $DISTRO = Fedora ]; then
					yum install -y mysql-server
				fi
				#service mariadb start
				#chkconfig mariadb on
				mysql -e "CREATE DATABASE if not exists webterminal DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;"
				;;
			no|n|N|NO)
				read -p "your database ip address:" db_ip
				read -p "your database port:" db_port
				read -p "your database user:" db_user
				read -p "your database password:" db_password
				[ ! $db_password ] && echo "your db_password is empty confirm please press Enter key"
				[ -f /usr/bin/mysql ]
				sleep 3
				if [ $? -eq 0 ]
				then
					mysql -h$db_ip -P$db_port -u$db_user -p$db_password -e "CREATE DATABASE if not exists webterminal DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;"
				else
					yum install -y mysql
					mysql -h$db_ip -P$db_port -u$db_user -p$db_password -e "CREATE DATABASE if not exists webterminal DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;"
				fi

				sed -i "s/host = 127.0.0.1/host = $db_ip/g" webterminal.conf
				sed -i "s/user = root/user = $db_user/g" webterminal.conf
				sed -i "s/port = 3306/port = $db_port/g" webterminal.conf
				sed -i "s/password =/password = $db_password/g" webterminal.conf
				;;
			*) 
				exit 1                    
				;;
		esac
	fi
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
		DISTRO='CentOS'
		PM='yum'
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
	databaseinit
}

install
