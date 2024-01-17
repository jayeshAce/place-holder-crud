const express = require("express");
const commentsController = require("../controller/comments");

const routes = express.Router();

routes.get("/getComments", commentsController.getComments);
routes.post("/addComments", commentsController.addComments);
routes.get("/getCommentById", commentsController.getCommentbyid);
routes.put("/updateComments", commentsController.updateComment);

routes.delete("/deletePost", commentsController.deleteComment);





module.exports = routes;
