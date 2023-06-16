const express = require("express");

const projectController = require("../controllers/projectController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

router.route("/").get(projectController.getAllProjects).post(
  //authController.restrictTo("admin", "set-admin"),
  projectController.uploadProjectThumbnailImage,

  projectController.resizeProjectThumbnailImage,
  projectController.createProject
);

router
  .route("/:id")
  .get(projectController.getProject)
  .patch(
    authController.restrictTo("admin", "set-admin"),

    projectController.updateProject
  )
  .delete(
    authController.restrictTo("admin", "set-admin"),
    projectController.deleteProject
  );

module.exports = router;
