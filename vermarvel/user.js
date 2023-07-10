let user = {
  name: null,
  email: null,
  token: null,
};

function updateUser(updatedUser) {
  user = updatedUser;
}

function getUser() {
  return user;
}

export { updateUser, getUser };
