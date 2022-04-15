const TokenKey = 'webterminal-token'

export function getAccessToken () {
  return localStorage.getItem(TokenKey + '-access')
}

export function getRefreshToken () {
  return localStorage.getItem(TokenKey + '-refresh')
}

export function setAccessToken (token) {
  localStorage.setItem(TokenKey + '-access', token)
}

export function setRefreshToken (token) {
  localStorage.setItem(TokenKey + '-refresh', token)
}

export function removeToken () {
  localStorage.removeItem(TokenKey + '-access')
  localStorage.removeItem(TokenKey + '-refresh')
}

export function SetUserInfoTolocal (userInfo) {
  localStorage.setItem('userinfo', JSON.stringify(userInfo))
}

export function RemoveUserInfoFromlocal (userInfo) {
  localStorage.removeItem('userinfo')
}

export function GetRememberMeToken () {
  return localStorage.getItem(TokenKey + '-remember-me-token')
}

export function SetRememberMeToken (token) {
  return localStorage.setItem(TokenKey + '-remember-me-token', token)
}

export function removeRememberMeToken () {
  localStorage.removeItem(TokenKey + '-remember-me-token')
}
