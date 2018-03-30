#!/bin/bash
set -e
Black=`tput setaf 0`   #${Black}
Red=`tput setaf 1`     #${Red}
Green=`tput setaf 2`   #${Green}
Yellow=`tput setaf 3`  #${Yellow}
Blue=`tput setaf 4`    #${Blue}
Magenta=`tput setaf 5` #${Magenta}
Cyan=`tput setaf 6`    #${Cyan}
White=`tput setaf 7`   #${White}
Bold=`tput bold`       #${Bold}
Rev=`tput smso`        #${Rev}
Reset=`tput sgr0`      #${Reset}

SCRIPT_VERSION=0.1

HELP () { #Help function
  echo -e \\n"${Bold}Webterminal Install Script Help.${Reset}"\\n
  exit 1
}

centosinstall() {
    Version=`rpm -q centos-release|cut -d- -f3`
	if [ $Version -eq 6 ]; then
				installhint
				yum clean all
				yum install centos-release-scl epel-release -y
				yum install python27 gcc python27-python-pip python27-python-setuptools python27-python-devel mysql-devel -y
				if test -f /opt/rh/python27/enable ; then
					source /opt/rh/python27/enable
				else
					echo "${Red}Python27 installed failed,Please retry.${Reset}"
					exit 1
				fi
				if ! grep -Eqi "source /opt/rh/python27/enable" /etc/profile ; then
					echo "source /opt/rh/python27/enable" >> /etc/profile
					source /etc/profile
				fi
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
		apt-get update -y
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
	echo "${Blue}####install database#### ${Reset}"
	echo -e "${Blue}1:sqlite3\n2:mysql ${Reset}"
	read -p "${Blue}If you just want to test this project recommend you use sqlite database[1/2]: ${Yellow}" dbtype
	
	if [ ! $dbtype ]; then
		case $db1 in
			1)
				sed -i "s/engine = mysql/engine = sqlite/g" webterminal.conf
				;;
			2)
				sed -i "s/engine = mysql/engine = mysql/g" webterminal.conf
				;;
			*)
				exit 1                    
				;;
		esac
	fi
	
	if [ $dbtype = 2 ]; then
		read -p "${Blue}do you want to create a new mysql database?[yes/no]: ${Yellow}" db1
		if [ ! $db1 ]
		then
		db1=yes
		fi
		
		case $db1 in
			yes|y|Y|YES)  
				echo "${Blue}installing a new mariadb.... ${Reset}"
				
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
				read -p "${Blue}your database ip address:${Yellow}" db_ip
				read -p "${Blue}your database port:${Yellow}" db_port
				read -p "${Blue}your database user:${Yellow}" db_user
				read -p "${Blue}your database password:${Yellow}" db_password
				[ ! $db_password ] && echo "${Blue}your db_password is empty confirm please press Enter key ${Reset}"
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
	echo "${Red}Your os system is $DISTRO: $Version ${Reset}"
	echo "${Red}Your os version is not supported! ${Reset}"
	echo "${Red}Please report this issue to github! ${Reset}"
	exit 1
}

installhint() {
	echo "${Blue}Your os system is $DISTRO: $Version ${Reset}"
	echo "${Blue}Now begin to start install webterminal...... ${Reset}"
	echo "${Blue}Now begin to install python redis guacd...... ${Reset}"
	echo "${Blue}It will spent serval minutes, Please waitting......... ${Reset}"
}

guacdcentosinstall(){
    Version=`rpm -q centos-release|cut -d- -f3`
	if [ $Version -eq 6 ]; then

            rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
            yum localinstall http://li.nux.ro/download/nux/dextop/el6/x86_64/nux-dextop-release-0-2.el6.nux.noarch.rpm -y

            yum clean all
            yum install epel-release -y

            yum install -y freerdp-plugins gcc gnu-free-mono-fonts pv libjpeg-devel freerdp-devel libssh2-devel libvorbis-devel libwebp-devel pulseaudio-libs-devel libvncserver-devel libssh-devel pango-devel ffmpeg ffmpeg-devel openssl-devel dialog libtelnet-devel wget cairo-devel libpng-devel uuid-devel

            yum localinstall http://sourceforge.net/projects/libjpeg-turbo/files/libjpeg-turbo-official-1.5.2.x86_64.rpm -y
            ln -vfs /opt/libjpeg-turbo/include/* /usr/include/
	        ln -vfs /opt/libjpeg-turbo/lib??/* /usr/lib64/

            cd /tmp
            wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
            tar -xvpf guacamole-server-0.9.14.tar.gz
            cd guacamole-server-0.9.14
            ./configure --with-init-dir=/etc/init.d
            make && make install

    elif [ $Version -eq 7 ]; then
            rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
            rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm

            yum clean all
            yum install epel-release -y

            yum install -y freerdp-plugins gcc gnu-free-mono-fonts pv libjpeg-devel freerdp-devel libssh2-devel libvorbis-devel libwebp-devel pulseaudio-libs-devel libvncserver-devel libssh-devel pango-devel ffmpeg ffmpeg-devel openssl-devel dialog libtelnet-devel wget cairo-devel libpng-devel uuid-devel

            yum localinstall http://sourceforge.net/projects/libjpeg-turbo/files/libjpeg-turbo-official-1.5.2.x86_64.rpm -y
            ln -vfs /opt/libjpeg-turbo/include/* /usr/include/
            ln -vfs /opt/libjpeg-turbo/lib??/* /usr/lib64/

            cd /tmp
            wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
            tar -xvpf guacamole-server-0.9.14.tar.gz
            cd guacamole-server-0.9.14
            ./configure --with-init-dir=/etc/init.d
            make && make install

    else
		notsupport
	fi
}

guacdubuntuinstall(){
	if [ `which lsb_release` ]; then
		Version=`lsb_release -r --short`
	else
		Version=`cat /etc/lsb-release |grep DISTRIB_RELEASE|cut -d = -f2`
	fi

	if [ $Version = 14.04 ]; then
        apt-get update -y

        apt-get install python-software-properties build-essential libpulse-dev libssh-dev libwebp-dev libvncserver-dev software-properties-common curl gcc libavcodec-dev libavutil-dev libcairo2-dev libswscale-dev libpango1.0-dev libfreerdp-dev libjpeg-turbo8-dev libssh2-1-dev libossp-uuid-dev libjpeg62-dev jq wget libpng-dev libvorbis-dev libpng12-dev libtelnet-dev libssl-dev -y

        add-apt-repository ppa:jonathonf/ffmpeg-3 -y

        apt-get update -y
        apt-get install ffmpeg libffmpegthumbnailer-dev -y

		cd /tmp
        wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
        tar -xvpf guacamole-server-0.9.14.tar.gz
        cd guacamole-server-0.9.14
        ./configure --with-init-dir=/etc/init.d
        make && make install
        ldconfig
    elif [ $Version = 16.04 ]||[ $Version = 17.10 ]||[ $Version = 18.04 ]; then
        apt-get update -y

        apt-get install python-software-properties build-essential libpulse-dev libssh-dev libwebp-dev libvncserver-dev software-properties-common curl gcc libavcodec-dev libavutil-dev libcairo2-dev libswscale-dev libpango1.0-dev libfreerdp-dev libssh2-1-dev libossp-uuid-dev jq wget libpng12-dev libvorbis-dev libtelnet-dev libssl-dev libjpeg-dev libjpeg-turbo8-dev -y

        add-apt-repository ppa:jonathonf/ffmpeg-3 -y

        apt-get update -y
        apt-get install ffmpeg libffmpegthumbnailer-dev -y

		cd /tmp
        wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
        tar -xvpf guacamole-server-0.9.14.tar.gz
        cd guacamole-server-0.9.14
        ./configure --with-init-dir=/etc/init.d
        make && make install
        ldconfig
        service guacd start
	else
		notsupport
	fi

}

guacdfedorainstall(){
	Version=`cat /etc/os-release |grep VERSION_ID|cut -d = -f2`
	if [ $Version = 25 ]||[ $Version = 26 ]||[ $Version = 27 ]; then
            rpm --import http://li.nux.ro/download/nux/RPM-GPG-KEY-nux.ro
            rpm -Uvh http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm

            yum clean all
            yum install epel-release -y

            yum install -y freerdp-plugins gcc gnu-free-mono-fonts pv libjpeg-devel freerdp-devel libssh2-devel libvorbis-devel libwebp-devel pulseaudio-libs-devel libvncserver-devel libssh-devel pango-devel ffmpeg ffmpeg-devel openssl-devel dialog libtelnet-devel wget cairo-devel libpng-devel uuid-devel

            yum localinstall http://sourceforge.net/projects/libjpeg-turbo/files/libjpeg-turbo-official-1.5.2.x86_64.rpm -y
            ln -vfs /opt/libjpeg-turbo/include/* /usr/include/
            ln -vfs /opt/libjpeg-turbo/lib??/* /usr/lib64/

            cd /tmp
            wget http://sourceforge.net/projects/guacamole/files/current/source/guacamole-server-0.9.14.tar.gz
            tar -xvpf guacamole-server-0.9.14.tar.gz
            cd guacamole-server-0.9.14
            ./configure --with-init-dir=/etc/init.d
            make && make install
	else
		notsupport
	fi

}

install() {
	#detact current user
	if [ `id -u` != 0 ];then  
		echo "${Red}Not root user! Please use with root permission user to run this script!${Reset}"
		exit 1
	fi
		
    if grep -Eqii "CentOS" /etc/issue || grep -Eq "CentOS" /etc/*-release; then
	DISTRO='CentOS'
	PM='yum'
	centosinstall
        guacdcentosinstall
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
        guacdfedorainstall
    elif grep -Eqi "Debian" /etc/issue || grep -Eq "Debian" /etc/*-release; then
        DISTRO='Debian'
        PM='apt'
		notsupport
    elif grep -Eqi "Ubuntu" /etc/issue || grep -Eq "Ubuntu" /etc/*-release; then
        DISTRO='Ubuntu'
        PM='apt'
	ubuntuinstall
        guacdubuntuinstall
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
