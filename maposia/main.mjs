import data from './data/data.json' assert { type: 'json' }

const users = data.users

users.forEach((user) => {
  console.log(
    `Пользователь ${user.firstName} ${user.lastName} родился ${user.dateOfBirth} известен как ${user.knowsAs}`
  )
})
