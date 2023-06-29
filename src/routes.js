const userControler = require("./controllers/userControler");

module.exports = [
  {
    endpoint: "/users",
    method: "GET",
    handler: userControler.listUser
  },
  {
    endpoint: "/users/:id",
    method: "GET",
    handler: userControler.getUserById
  },
  {
    endpoint: "/users",
    method: "POST",
    handler: userControler.createUser
  },
]