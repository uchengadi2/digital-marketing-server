const express = require("express");

const connectionController = require("../controllers/connectionController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

router
  .route("/")
  .get(
    authController.restrictTo("admin", "old-student", "set-admin"),
    connectionController.getAllConnections
  )
  .post(
    authController.restrictTo("admin", "old-student", "set-admin"),
    // membershipController.uploadCourseCoverImage,

    connectionController.createConnection
  );

router
  .route("/:id")
  .get(connectionController.getConnection)
  .patch(
    authController.restrictTo("admin", "old-student", "set-admin"),

    connectionController.updateConnection
  )
  .delete(
    authController.restrictTo("admin", "set-admin"),
    connectionController.deleteConnection
  );

module.exports = router;
