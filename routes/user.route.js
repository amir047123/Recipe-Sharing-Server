const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.post("/addUser", userController.createUser);
router.get("/by-email", userController.getUserByQuery);
router.patch("/:id", userController.updateUser);
router.get("/count", userController.getTotalUserCount); 


module.exports = router;
