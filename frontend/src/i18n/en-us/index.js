export default {
  // user page
  user: {
    new: 'Add New user',
    table: {
      columns: {
        username: {
          name: 'User Name',
          label: 'User Name',
          hint: 'User Name'
        },
        email: {
          name: 'Email',
          label: 'Email',
          hint: 'Email'
        }
      }
    },
    User: 'User',
    create_user: 'Create User',
    user_name: 'User name',
    update_user: 'Update user',
    delete_user: 'Are you sure to delete user: {username}',
    delete_user_success: 'User: {username} has been deleted',
    update_user_success: 'User: {username} has been updated',
    create_user_success: 'User: {username} has been created',
    password_validation: 'Password and password verify must be equal!'
  },
  'Please type user name at least 2 characters': 'Please type user name at least 2 characters',
  'Please type your password at least 8 characters': 'Please type your password at least 8 characters',
  'Please retype your password at least 8 characters': 'Please retype your password at least 8 characters',
  'Password and verify password must equal': 'Password and verify password must equal',
  'Please input your email address': 'Please input your email address',
  'User password': 'User password',
  'Verify your password': 'Verify your password',
  'Email address': 'Email address',
  'password strength': 'password strength',
  'About Us': 'About Us',
  'Our mission is to give everyone a full control platform to manage all your it asset.': 'Our mission is to give everyone a full control platform to manage all your it asset.',

  // Credential page
  credential: {
    new: 'Create New Credential',
    credential: 'Credential',
    Credential: 'Credential',
    table: {
      columns: {
        name: {
          name: 'Name',
          label: 'Name',
          hint: 'Name'
        },
        username: {
          name: 'User Name',
          label: 'User Name',
          hint: 'User Name'
        },
        protocol: {
          name: 'protocol',
          label: 'Protocol',
          hint: 'protocol'
        },
        port: {
          name: 'port',
          label: 'Port',
          hint: 'port'
        }
      }
    },
    create_credential: 'Create credential',
    update_credential: 'Update credential',
    delete_credential: 'Are you sure to delete credential: {name}',
    delete_credential_success: 'Credential: {name} has been deleted',
    update_credential_success: 'Credential: {name} has been updated',
    create_credential_success: 'Credential: {name} has been created'
  },
  'Please type your credential name': 'Please type your credential name',
  'Credential name': 'Credential name',
  Protocol: 'Protocol',
  'User name': 'User name',
  Security: 'Security',
  'Use ssh key': 'Use ssh key',
  'Please type your password': 'Please type your password',
  'User Key': 'User Key',
  'Please type your key': 'Please type your key',
  'Please type a valid width value': 'Please type a valid width value',
  'Please type a valid port value': 'Please type a valid port value',
  'Please type a valid height value': 'Please type a valid height value',
  'Please type a valid dpi value': 'Please type a valid dpi value',
  Width: 'Width',
  Port: 'Port',
  Height: 'Height',
  Dpi: 'Dpi',
  'Use proxy': 'Use proxy',
  'Proxy server ip': 'Proxy server ip',
  'Please type your server ip': 'Please type your server ip',
  'Proxy server port': 'Proxy server port',
  'Please type a valid proxy port': 'Please type a valid proxy port',
  'Proxy password': 'Proxy password',
  'Please type your proxy password': 'Please type your proxy password',
  'No user can login !': 'No user can login !',
  'Not supported system.': 'Not supported system.',
  'You haven\'t install webterminal helper,please download and install it.': 'You haven\'t install webterminal helper,please download and install it.',
  Audit: 'Audit',
  User: 'User',
  Permission: 'Permission',
  Settings: 'Settings',
  Webterminal: 'Webterminal',
  Credential: 'Credential',
  'Command execution': 'Command execution',
  'Batch command execution': 'Batch command execution',
  Group: 'Group',
  Server: 'Server',
  Commands: 'Commands',
  // log page
  log: {
    log: 'Log',
    table: {
      columns: {
        username: {
          name: 'User Name',
          label: 'User Name',
          hint: 'User Name'
        },
        servername: {
          name: 'Server Name',
          label: 'Server Name',
          hint: 'Server Name'
        },
        ip: {
          name: 'Ip',
          label: 'Ip',
          hint: 'Ip'
        },
        start_time: {
          name: 'Start Time',
          label: 'Start Time',
          hint: 'Start Time'
        },
        is_finished: {
          name: 'Is Finished',
          label: 'Is Finished',
          hint: 'Is Finished'
        }
      }
    },
    play_log: 'play log',
    stop: 'stop',
    monitor: 'monitor',
    commands: 'commands'
  },
  username: 'user name',
  'server address': 'server',
  'start date': 'start date',
  'end date': 'end date',

  // group page
  group: {
    Servers: 'Servers',
    Server: 'Server',
    Group: 'Group',
    new: 'Add New Group',
    table: {
      columns: {
        name: {
          name: 'Group Name',
          label: 'Group Name',
          hint: 'Group Name'
        },
        servers: {
          name: 'servers',
          label: 'Servers',
          hint: 'Servers'
        }
      }
    },
    create_group: 'Create group',
    update_group: 'Update group',
    delete_group: 'Are you sure to delete group: {name}',
    delete_group_success: 'Group: {name} has been deleted',
    update_group_success: 'Group: {name} has been updated',
    create_group_success: 'Group: {name} has been created'
  },
  'Create Group': 'Create Group',
  'Group name': 'Group name',
  'Please type group name at least 2 characters': 'Please type group name at least 2 characters',

  // server page
  server: {
    Credentials: 'Credentials',
    Credential: 'Credential',
    credential: 'credential',
    Groups: 'Groups',
    Server: 'Server',
    new: 'Add New Server',
    table: {
      columns: {
        name: {
          name: 'Server Name',
          label: 'Server Name',
          hint: 'Server Name'
        },
        hostname: {
          name: 'Host Name',
          label: 'Host Name',
          hint: 'Host Name'
        },
        ip: {
          name: 'Ip',
          label: 'Ip',
          hint: 'Ip'
        }
      }
    },
    create_server: 'Create server',
    update_server: 'Update server',
    delete_server: 'Are you sure to delete server: {name}',
    delete_server_success: 'Server: {name} has been deleted',
    update_server_success: 'Server: {name} has been updated',
    create_server_success: 'Server: {name} has been created'
  },
  'Create Server': 'Create Server',
  'Server name': 'Server name',
  'Please type server name at least 2 characters': 'Please type server name at least 2 characters',
  'Group will be used to control permission': 'Group will be used to control permission',
  'Please type a valid ip address': 'Please type a valid ip address',

  // command page
  command: {
    Groups: 'Groups',
    Group: 'Group',
    Command: 'Command',
    Commands: 'Commands',
    new: 'Add New Command',
    table: {
      columns: {
        name: {
          name: 'Name',
          label: 'Name',
          hint: 'Name'
        },
        groups: {
          name: 'Groups',
          label: 'Groups',
          hint: 'Groups'
        },
        commands: {
          name: 'Commands',
          label: 'Commands',
          hint: 'Commands'
        }
      }
    },
    create_command: 'Create command',
    update_command: 'Update command',
    delete_command: 'Are you command to delete command: {name}',
    delete_command_success: 'Command: {name} has been deleted',
    update_command_success: 'Command: {name} has been updated',
    create_command_success: 'Command: {name} has been created'
  },
  'Please type name at least 2 characters': 'Please type name at least 2 characters',
  'Please type command name at least 2 characters': 'Please type command name at least 2 characters',
  'Command name': 'Command name',

  // permission page
  permission: {
    new: 'Add New Permission',
    Permission: 'Permission',
    Permissions: 'Permissions',
    Groups: 'Groups',
    Group: 'Group',
    Users: 'Users',
    table: {
      columns: {
        usernmae: {
          name: 'User Name',
          label: 'User Name',
          hint: 'User Name'
        },
        groups: {
          name: 'Groups',
          label: 'Groups',
          hint: 'Groups'
        },
        permissions: {
          name: 'Permissions',
          label: 'Permissions',
          hint: 'Permissions'
        }
      }
    },
    create_permission: 'Create permission',
    update_permission: 'Update permission',
    delete_permission: 'Are you want to reovke user {name}\'s  permission',
    delete_permission_success: 'Permission: user {name}\'s  permission has been revoked',
    update_permission_success: 'Permission: user {name}\'s has been updated',
    create_permission_success: 'Permission: user {name}\'s has been created'
  },
  // permission code
  'Can view command log info': 'Can view command log info',
  'Can add commands': 'Can add commands',
  'Can change commands info': 'Can change commands info',
  'Can delete commands info': 'Can delete commands info',
  'Can execute commands': 'Can execute commands',
  'Can view commands info': 'Can view commands info',
  'Can add credential': 'Can add credential',
  'Can change credential info': 'Can change credential info',
  'Can delete credential info': 'Can delete credential info',
  'Can view credential info': 'Can view credential info',
  'Can delete log info': 'Can delete log info',
  'Can play record': 'Can play record',
  'Can view log info': 'Can view log info',
  'Can add group': 'Can add group',
  'Can change group info': 'Can change group info',
  'Can delete group info': 'Can delete group info',
  'Can view group info': 'Can view group info',
  'Can add server': 'Can add server',
  'Can change server info': 'Can change server info',
  'Can connect to server': 'Can connect to server',
  'Can delete server info': 'Can delete server info',
  'Can manage file': 'Can manage file',
  'Can kill online user': 'Can kill online user',
  'Can monitor user action': 'Can monitor user action',
  'Can view server info': 'Can view server info',
  'Can change settings info': 'Can change settings info',
  'Can view settings info': 'Can view settings info',
  'Can add user permission': 'Can add user permission',
  'Can add user': 'Can add user',
  'Can change user permission': 'Can change user permission',
  'Can change user info': 'Can change user info',
  'Can revoke user permission': 'Can revoke user permission',
  'Can delete user info': 'Can delete user info',
  'Can view user permission': 'Can view user permission',
  'Can view time zone list': 'Can view time zone list',
  'Can configuration default user settings': 'Can configuration default user settings',
  'Can modify default user settings': 'Can modify default user settings',
  'Can delete default user settings': 'Can delete default user settings',
  'Can view default user settings': 'Can view default user settings',
  'Can view user info': 'Can view user info',

  // settings page
  settings: {
    helper_swith: 'Webterminal Plugin Detect Switch',
    mfa: 'Open mfa function',
    use_timezone: 'Use TimeZone Time (If you set this configuration will affect records datetime on your database!)',
    timezone: 'Time Zone',
    update_settings_success: 'Settings has been updated, Please restart the server to make it work'
  },

  // defaultusersettings
  defaultusersettings: {
    create_defaultusersettings_success: 'Settings user {name} to default login user',
    update_defaultusersettings_success: 'Update user {name} to default login user'
  },

  Confirm: 'Confirm',
  Search: 'Search',
  action: 'action',
  Submit: 'Submit',
  Reset: 'Reset',
  // login page
  'Welcome come back': 'Welcome come back',
  'Please the input correct username or password': 'Please the input correct username or password',
  'Username/Email': 'Username/Email',
  'Please input your password': 'Please input your password',
  'Forgotten Password': 'Forgotten Password',
  'Remember me': 'Remember me',
  Login: 'Login'
}
