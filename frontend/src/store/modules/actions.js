import * as auth from '../../lib/auth'
import axios from 'axios'
import { getRefreshToken } from '../../lib/auth'

export function Logout () {
  axios.post('/common/api/blacktoken/', { token: getRefreshToken() }).then(() => {
    auth.removeToken()
    auth.RemoveUserInfoFromlocal()
  }).catch(() => {

  })
  this.$router.push({
    name: 'login'
  })
}
