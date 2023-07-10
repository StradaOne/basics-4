class User {
  constructor(name, email, token) {
    this.name = name
    this.email = email
    this.token = token
  }

  setName(name) {
    this.name = name
  }

  setEmail(email) {
    this.email = email
  }

  setToken(token) {
    this.token = token
  }

  logout() {
    this.name = null
    this.email = null
    this.token = null
  }
}

let userMain = null

function createUser(token, email, name) {
  userMain = new User(name, email, token)
}

export { createUser, userMain }
