const express = require("express");
const postController = require("../controller/posts");

const routes = express.Router();

routes.get("/getPosts", postController.getPost);
routes.post("/addPosts", postController.addPosts);
routes.get("/getPostById", postController.getPostbyid);
routes.put("/updatePost", postController.updatePostById);

routes.delete("/deletePost", postController.deletePost);





module.exports = routes;
