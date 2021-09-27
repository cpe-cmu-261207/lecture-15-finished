export const loadToken = () => {
  return localStorage.getItem('token')
}

export const saveToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const loadUsername = () => {
  return localStorage.getItem('username')
}

export const saveUsername = (username: string) => {
  localStorage.setItem('username', username)
}