class TokenService {
  getLocalRefreshToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token?.refresh;
  }

  getLocalAccessToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    return token?.access;
  }

  updateLocalAccessToken(newToken) {
    const token = JSON.parse(localStorage.getItem('token'));
    token.access = newToken;
    localStorage.setItem('token', JSON.stringify(token));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('token'));
  }

  setUser(token) {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeUser() {
    localStorage.removeItem('token')
  }
}

export default new TokenService()
