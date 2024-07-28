const express = require("express");
const projectController = require("./../controllers/projectController");
const authController = require("./../controllers/authController");

const collegecontroller = require("./../controllers/collegeController");
const router = express.Router();

router
  .route("/top-5-likes")
  .get(projectController.topprojects, projectController.getAllProjects);

router.get("/topproject", projectController.topprojects);

router.route("/college-stats").get(projectController.collegeInfo);
router
  .route("/college-stats/:id")
  .get(projectController.collegeInfo, collegecontroller.getsingleCollege);

router
  .route("/home")
  .get(projectController.home, projectController.getAllProjects);

router
  .route("/:id")
  .get(projectController.getsingleproject)
  .delete(projectController.deleteProject);

router.route("/home/like/:id").put(projectController.likeProject);

router.route("/home/dislike/:id").put(projectController.dislikeProject);

router.route("/search/:key").get(projectController.searchProject);
router
  .route("/")
  .get(
    // authController.protect,
    // authController.restrictTo("admin"),
    projectController.getAllProjects
  )
  .post(projectController.createProject);

module.exports = router;
