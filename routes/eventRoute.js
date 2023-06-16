const express = require("express");

const eventController = require("../controllers/eventController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

router.route("/").get(eventController.getAllEvents).post(
  //authController.restrictTo("admin", "set-admin"),
  eventController.uploadEventImages,
  eventController.resizeEventImages,

  eventController.createEvent
);

router
  .route("/:id")
  .get(eventController.getEvent)
  .patch(
    //authController.restrictTo("admin", "set-admin"),
    eventController.uploadEventImages,
    eventController.resizeEventImages,

    eventController.updateEvent
  )
  .delete(
    authController.restrictTo("admin", "set-admin"),
    eventController.deleteEvent
  );

module.exports = router;
