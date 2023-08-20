const users = [
    {
      id: 1,
      name: "Grant",
      username: "grantgroseclose",
      email: "grantgroseclose@domain.com",
      password: "123456",
    }
];
  
const getUsers = () => users;

const getUserById = (id) => users.find((user) => user.id === id);

const getUserByEmail = (email) => users.find((user) => user.email === email);

const getUserByUsername = (username) => users.find((user) => user.username === username);

const addUser = (user) => {
  user.id = users.length + 1;
  users.push(user);
};

const updateUserPassword = ({ username, password }) => {
  let user = getUserByUsername(username);
  user.password = password;
}

module.exports = {
  getUsers,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  addUser,
  updateUserPassword
};
