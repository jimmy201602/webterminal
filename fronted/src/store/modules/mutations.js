import { setAccessToken, SetUserInfoTolocal, setRefreshToken } from 'src/lib/auth'

export function SetUserInfo (state, userInfo) {
  const redirect = userInfo.redirect
  delete userInfo.redirect
  state.userInfo = userInfo
  if (redirect && redirect !== '/login') {
    this.$router.push({
      path: redirect
    })
  } else {
    this.$router.push({
      name: 'home'
    })
  }

  SetUserInfoTolocal(userInfo)
}

export function Login (state, token) {
  setAccessToken(token.access)
  setRefreshToken(token.refresh)
}
