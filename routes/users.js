const express = require("express");
const usersController = require("../controller/users");

const routes = express.Router();

routes.get("/getUser", usersController.getUser);
routes.post("/addUsers", usersController.addUsers);
routes.get("/getUserById", usersController.getUserById);
routes.put("/updateUser", usersController.updateUserById);

routes.delete("/deleteuser", usersController.deleteUser);





module.exports = routes;
