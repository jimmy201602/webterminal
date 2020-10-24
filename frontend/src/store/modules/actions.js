import * as auth from '../../lib/auth'

export function Logout () {
  auth.removeToken()
  auth.RemoveUserInfoFromlocal()
  this.$router.push({
    name: 'login'
  })
}
