const express = require("express");
const collegeController = require("../controllers/collegeController");

const router = express.Router();

router
  .route("/")
  .get(collegeController.getAllColleges)
  .post(collegeController.createCollege);

router.route("/:id").get(collegeController.getsingleCollege);

router.get("/search/:partialName", collegeController.searchColleges);

router.route("/:id").patch(collegeController.updateCollege);

module.exports = router;
