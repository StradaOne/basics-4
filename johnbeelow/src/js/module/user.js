import { cookies } from "./storage"

class User {
  constructor() {
    this.name = cookies.getUser()
    this.email = cookies.getEmail()
    this.token = cookies.getCode()
  }

  setName(name) {
    cookies.saveUser(name)
    this.name = name
  }

  setEmail(email) {
    cookies.saveEmail(email)
    this.email = email
  }

  setToken(token) {
    cookies.saveCode(token)
    this.token = token
  }

  logout() {
    cookies.removeCode()
    cookies.removeEmail()
    cookies.removeUser()
    this.name = null
    this.email = null
    this.token = null
  }
}

let userMain = new User()

export { userMain }
