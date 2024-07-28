const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

router.patch("/resetPassword/:token", authController.resetPassword);
router.get(
  "/me",
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.delete("/deleteme", authController.protect, userController.deleteme);
router
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo("admin"),
    userController.getAllUsers
  )
  .post(userController.createUser);
router.route("/:name").get(userController.getsuser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
