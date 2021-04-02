export default {
  // user page
  user: {
    new: '添加新用户',
    table: {
      columns: {
        username: {
          name: '用户名称',
          label: '用户名称',
          hint: '用户名称'
        },
        email: {
          name: '邮件',
          label: '邮件',
          hint: '邮件'
        }
      }
    },
    User: '用户',
    create_user: '创建用户',
    user_name: '用户名称',
    update_user: '更新用户',
    delete_user: '是否要删除用户: {username}',
    delete_user_success: '用户: {username} 已经被删除',
    update_user_success: '用户: {username} 已被更新',
    create_user_success: '用户: {username} 已经创建',
    password_validation: '密码和密码校验必须一致!'
  },
  'Please type user name at least 2 characters':
    '用户名必须包含两个字符',
  'Please type your password at least 8 characters':
    '密码必须包含8个字符',
  'Please retype your password at least 8 characters':
    '请重新输入你的密码',
  'Password and verify password must equal':
    '密码和密码校验必须一致',
  'Please input your email address': '请输入你的邮箱地址',
  'User password': '用户密码',
  'Verify your password': '校验你的密码',
  'Email address': '邮箱地址',
  'password strength': '密码强度',
  'About Us': '关于我们',
  'Our mission is to give everyone a full control platform to manage all your it asset.':
    '我们的使命是给每个用户一个全控制的平台去管理所有的设备.',
  'Contact Us': '联系我们',
  Email: '邮箱',
  Github: 'Github',
  'DESIGN PHILOSOPHY': '设计哲学',
  'Easy to use. Agile deployment. Full control. Full auidt platform.':
    '易于使用. 灵活部署. 全量控制. 完全的审计平台.',
  'OUR MISSION': '我们的使命',
  'Provide a full control platform to manage all your IT asset.':
    '提供一个全面控制的平台去管理我们的IT资产.',
  'OUR VALUE': '我们的价值',
  'Try to provide a easy way to control and audit your action platform to manage all your asset.':
    '尝试提供一个简单易用的方式去控制和审计所有的用户行为管理IT资产的平台.',
  'no otp token': '无多因子认证码',
  'error otop token': '错误的多因子认证码',
  'Two Factor Token': '多因子认证码',
  'This field is required': '此字段属于必填项',
  Setting: '设置',
  MFA: '多因子认证',
  'Verify code': '认证码',
  'redirect otp settings page': '重定向至多因子认证设置页面',
  'If you set up 2 - Step Verification, you should install':
    '如果你需要设置多因子认证,你必须安装',
  'Google Authenticator': '谷歌身份验证器应用',
  'Scan the QR code on the left then you can obtain the verify code.':
    '扫描左侧的二维码你会绑定并获取多因子认证码.',
  'Download Google Authenticator': '下载谷歌身份验证器应用',
  'Scan QR code to start download': '扫描二维码开始下载',
  'Bind MFA': '绑定多因子认证',
  'Use key password': '使用密匙密码',
  'Auth key password': '认证密匙密码',
  'Two Factor MFA setting': '多因子认证设置',
  'Please input the mfa code!': '请输入多因子认证码!',
  'Bind mfa success, please login the user again!':
    '绑定多因子认证成功, 请重新登录用户以生效!',
  'Bind mfa failed, please input a validate verify code!':
    '绑定多因子认证失败, 请输入有效的多因子认证码!',
  'User ip changed, Please use username and password to authenticate.':
    '用户ip地址已改变, 请使用用户名和密码重新认证.',
  'Illegal visit, please contact your administrator!':
    '不合法的访问,请联系的管理员!',
  'For security concern, remember password function only last one day!':
    '为了安全考虑,记住用户密码功能至多持续一天!',
  more: '更多',
  'Session has been ended!': '会话已结束!',

  // Credential page
  credential: {
    new: '创建新的凭证',
    credential: '凭证',
    Credential: '凭证',
    table: {
      columns: {
        name: {
          name: '名称',
          label: '名称',
          hint: '名称'
        },
        username: {
          name: '用户名',
          label: '用户名',
          hint: '用户名'
        },
        protocol: {
          name: '协议',
          label: '协议',
          hint: '协议'
        },
        port: {
          name: '端口',
          label: '端口',
          hint: '端口'
        }
      }
    },
    create_credential: '创建凭证',
    update_credential: '更新凭证',
    delete_credential: '你确定要删除凭证: {name}',
    delete_credential_success: '凭证: {name} 已经被删除',
    update_credential_success: '凭证: {name} 已被更新',
    create_credential_success: '凭证: {name} 已被创建'
  },
  'Please type your credential name': '请输入你的凭证名称',
  'Credential name': '凭证名称',
  Protocol: '协议',
  'User name': '用户名',
  Security: '安全',
  'Use ssh key': '使用SSH密匙',
  'Please type your password': '请输入密码',
  'User Key': '用户密匙',
  'Please type your key': '请输入密匙',
  'Please type a valid width value': '请输入有效的宽度值',
  'Please type a valid port value': '请输入有效的端口值',
  'Please type a valid height value': '请输入有效的高度值',
  'Please type a valid dpi value': '请输入有效的DPI值',
  Width: '宽度',
  Port: '端口',
  Height: '高度',
  Dpi: 'DPI',
  'Use proxy': '使用代理',
  'Proxy server ip': '代理服务器地址',
  'Please type your server ip': '请输入你的代理ip地址',
  'Proxy server port': '代理服务器端口',
  'Please type a valid proxy port': '请输入有效的代理端口',
  'Proxy password': '代理密码',
  'Please type your proxy password': '请输入代理密码',
  'No user can login !': '没有可用的用户登录此服务器! 请确认你有权限来连接词服务器. 你可以检查权限设置来确认你有有效的用户来登录此服务器.',
  'Not supported system.': '不支持的系统.',
  "You haven't install webterminal helper,please download and install it.":
    '你没有安装webterminal调用助手,请下载安装.',
  Audit: '审计',
  User: '用户',
  Permission: '权限',
  Settings: '设置',
  Webterminal: 'Webterminal',
  Credential: '凭证',
  'Command execution': '命令执行',
  'Batch command execution': '批量命令执行',
  Group: '服务器组',
  Server: '服务器',
  Commands: '命令组',
  // log page
  log: {
    log: '日志',
    table: {
      columns: {
        username: {
          name: '用户名',
          label: '用户名',
          hint: '用户名'
        },
        servername: {
          name: '服务器名称',
          label: '服务器名称',
          hint: '服务器名称'
        },
        ip: {
          name: 'Ip',
          label: 'Ip',
          hint: 'Ip'
        },
        start_time: {
          name: '开始时间',
          label: '开始时间',
          hint: '开始时间'
        },
        is_finished: {
          name: '是否结束',
          label: '是否结束',
          hint: '是否结束'
        }
      }
    },
    play_log: '审计日志',
    stop: '终止',
    monitor: '监控',
    commands: '执行命令'
  },
  username: '用户名称',
  'server address': '服务器地址',
  'start date': '开始时间',
  'end date': '结束时间',

  // group page
  group: {
    Servers: '服务器',
    Server: '服务器',
    Group: '服务器组',
    new: '创建新服务器组',
    table: {
      columns: {
        name: {
          name: '组名称',
          label: '组名称',
          hint: '组名称'
        },
        servers: {
          name: '服务器',
          label: '服务器',
          hint: '服务器'
        }
      }
    },
    create_group: '创建服务器组',
    update_group: '更新服务器组',
    delete_group: '确定要删除服务器组: {name}',
    delete_group_success: '服务器组: {name} 已经被删除',
    update_group_success: '服务器组: {name} 已经被更新',
    create_group_success: '服务器组: {name} 已经被创建'
  },
  'Create Group': '创建服务器组',
  'Group name': '组名称',
  'Please type group name at least 2 characters':
    '服务器组名称包含至少两个字符',

  // server page
  server: {
    Credentials: '凭证',
    Credential: '凭证',
    credential: '凭证',
    Groups: '服务器组',
    Server: '服务器',
    new: '新增服务器',
    table: {
      columns: {
        name: {
          name: '服务器名称',
          label: '服务器名称',
          hint: '服务器名称'
        },
        hostname: {
          name: '主机名称',
          label: '主机名称',
          hint: '主机名称'
        },
        ip: {
          name: 'Ip',
          label: 'Ip',
          hint: 'Ip'
        }
      }
    },
    create_server: '创建服务器',
    update_server: '更新服务器',
    delete_server: '确定删除服务器: {name}',
    delete_server_success: '服务器: {name} 已经被删除',
    update_server_success: '服务器: {name} 已经更新',
    create_server_success: '服务器: {name} 已经创建'
  },
  'Create Server': '创建服务器',
  'Server name': '服务器名称',
  'Please type server name at least 2 characters':
    '服务器名称包含至少两个字符',
  'Group will be used to control permission':
    '服务器组将会用于权限控制',
  'Please type a valid ip address': '请输入有效的ip地址',

  // command page
  command: {
    Groups: '服务器组',
    Group: '服务器组',
    Command: '命令',
    Commands: '命令',
    new: '新增命令',
    table: {
      columns: {
        name: {
          name: '名称',
          label: '名称',
          hint: '名称'
        },
        groups: {
          name: '服务器组',
          label: '服务器组',
          hint: '服务器组'
        },
        commands: {
          name: '命令',
          label: '命令',
          hint: '命令'
        }
      }
    },
    create_command: '创建命令',
    update_command: '更新命令',
    delete_command: '你确定要删除命令: {name}',
    delete_command_success: '命令: {name} 已经被删除',
    update_command_success: '命令: {name} 已经被更新',
    create_command_success: '命令: {name} 已经被创建'
  },
  'Please type name at least 2 characters':
    '命令名称包含至少两个字符',
  'Please type command name at least 2 characters':
    '命令名称包含至少两个字符',
  'Command name': '命令名称',

  // permission page
  permission: {
    Credential: '用户可登陆服务器的用户账户凭证',
    credential: '凭证用户名',
    new: '新增权限',
    Permission: '权限',
    Permissions: '权限',
    Groups: '服务器组',
    Group: '服务器组',
    Users: '用户',
    table: {
      columns: {
        usernmae: {
          name: '用户名称',
          label: '用户名称',
          hint: '用户名称'
        },
        groups: {
          name: '服务器组',
          label: '服务器组',
          hint: '服务器组'
        },
        permissions: {
          name: '权限',
          label: '权限',
          hint: '权限'
        }
      }
    },
    create_permission: '创建权限',
    update_permission: '更新权限',
    delete_permission: '确定收回用户 {name} 的权限',
    delete_permission_success:
      '权限: 用户 {name} 的权限已经被收回',
    update_permission_success: '权限: 用户 {name} 的权限已经被更新',
    create_permission_success: '权限: 用户 {name} 的权限已经新增'
  },
  // permission code
  permissiontree: {
    common: '通用设置',
    commandlog: '命令日志',
    commandssequence: '命令配置',
    credential: '凭证信息',
    defaultusersettings: '默认登录信息设置',
    log: '审计日志',
    servergroup: '服务器组',
    serverinfor: '服务器信息',
    settings: '设置信息',
    permission: '权限信息',
    'Can view command log info': '可查看命令审计日志信息',
    'Can add commands': '可新增命令',
    'Can change commands info': '可更新命令信息',
    'Can delete commands info': '可删除命令信息',
    'Can execute commands': '可执行命令',
    'Can view commands info': '可查看命令信息',
    'Can add credential': '可新增凭证',
    'Can change credential info': '可更新凭证信息',
    'Can delete credential info': '可删除凭证信息',
    'Can view credential info': '可查看凭证信息',
    'Can delete log info': '可删除审计日志信息',
    'Can play record': '可查看审计录像',
    'Can view log info': '可查看日志信息',
    'Can add group': '可新增服务器组',
    'Can change group info': '可更新服务器组信息',
    'Can delete group info': '可删除服务器组信息',
    'Can view group info': '可查看服务器组信息',
    'Can add server': '可新增服务器',
    'Can change server info': '可更新服务器信息',
    'Can connect to server': '可连接至服务器',
    'Can delete server info': '可删除服务器信息',
    'Can manage file': '可管理文件',
    'Can kill online user': '可终止在线用户',
    'Can monitor user action': '可监控用户行为',
    'Can view server info': '可查看服务器信息',
    'Can change settings info': '可更改设置信息',
    'Can view settings info': '可查看设置信息',
    'Can add user permission': '可新增用户权限',
    'Can add user': '可新增用户',
    'Can change user permission': '可查看用户权限',
    'Can change user info': '可修改用户信息',
    'Can revoke user permission': '可回收用户权限',
    'Can delete user info': '可删除用户信息',
    'Can view user permission': '可查看用户权限信息',
    'Can view time zone list': '可查看时区列表',
    'Can configuration default user settings':
      '可设置默认的用户登录信息',
    'Can modify default user settings': '可修改默认的用户设置信息',
    'Can delete default user settings': '可删除默认的用户设置信息',
    'Can view default user settings': '可查看默认用户设置信息',
    'Can view user info': '可查看用户信息'
  },
  'Can view command log info': '可查看命令审计日志信息',
  'Can add commands': '可新增命令',
  'Can change commands info': '可更新命令信息',
  'Can delete commands info': '可删除命令信息',
  'Can execute commands': '可执行命令',
  'Can view commands info': '可查看命令信息',
  'Can add credential': '可新增凭证',
  'Can change credential info': '可更新凭证信息',
  'Can delete credential info': '可删除凭证信息',
  'Can view credential info': '可查看凭证信息',
  'Can delete log info': '可删除审计日志信息',
  'Can play record': '可查看审计录像',
  'Can view log info': '可查看日志信息',
  'Can add group': '可新增服务器组',
  'Can change group info': '可更新服务器组信息',
  'Can delete group info': '可删除服务器组信息',
  'Can view group info': '可查看服务器组信息',
  'Can add server': '可新增服务器',
  'Can change server info': '可更新服务器信息',
  'Can connect to server': '可连接至服务器',
  'Can delete server info': '可删除服务器信息',
  'Can manage file': '可管理文件',
  'Can kill online user': '可终止在线用户',
  'Can monitor user action': '可监控用户行为',
  'Can view server info': '可查看服务器信息',
  'Can change settings info': '可更改设置信息',
  'Can view settings info': '可查看设置信息',
  'Can add user permission': '可新增用户权限',
  'Can add user': '可新增用户',
  'Can change user permission': '可查看用户权限',
  'Can change user info': '可修改用户信息',
  'Can revoke user permission': '可回收用户权限',
  'Can delete user info': '可删除用户信息',
  'Can view user permission': '可查看用户权限信息',
  'Can view time zone list': '可查看时区列表',
  'Can configuration default user settings':
    '可设置默认的用户登录信息',
  'Can modify default user settings': '可修改默认的用户设置信息',
  'Can delete default user settings': '可删除默认的用户设置信息',
  'Can view default user settings': '可查看默认用户设置信息',
  'Can view user info': '可查看用户信息',

  // settings page
  settings: {
    helper_swith: 'Webterminal调用助手探测开关',
    mfa: '开启多因子认证功能',
    use_timezone:
      '使用时区时间 (如果设置此配置那么将影响数据库中的时间日期记录!)',
    timezone: '时区',
    update_settings_success:
      '设置已经更新,请重新启动webterminal服务以使设置生效'
  },

  // defaultusersettings
  defaultusersettings: {
    create_defaultusersettings_success:
      '设置用户 {name} 为默认登录用户',
    update_defaultusersettings_success:
      '更新用户 {name} 为默认登录用户'
  },

  Confirm: '确认',
  Search: '搜索',
  action: '操作',
  Submit: '提交',
  Reset: '重置',
  // login page
  'Welcome come back': '欢迎回家',
  'Please input the correct username or password':
    '请输入正确的用户名或者密码',
  'Username/Email': '用户名/密码',
  'Please input your password': '请输入你的密码',
  'Forgotten Password': '忘记密码',
  'Remember me': '记住我',
  Login: '登录',
  About: '关于',
  'Contact us': '联系我们',
  Permissions: '权限',
  Groups: '服务器组'
}
