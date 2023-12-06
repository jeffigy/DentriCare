const express = require("express");
const router = express.Router();
const userSController = require("../controllers/usersController");

router
  .route("/")
  .get(userSController.getAllUsers)
  .post(userSController.createNewUser)
  .patch(userSController.updateUser)
  .delete(userSController.deleteUser);

module.exports = router;
