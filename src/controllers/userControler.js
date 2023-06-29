const users = require("../mocks/users");

module.exports = {
  listUser(request, response) {
    const { order } = request.query
    const  sortedUser = users.sort((a,b) => {
      if(order === "desc"){
        return a.id < b.id ? 1 : -1;
      }
      return a.id > b.id ? 1 : -1;
    })


    response.send(200, sortedUser);
  },
  
  getUserById(request, response) {
    const { id } = request.params

    const user = users.find(user => user.id === Number(id))
    if(!user){
      return response.send(404, {error: "User not found"});
    }
    response.send(200, user);
  }
}