const express = require("express");

const membershipController = require("../controllers/MembershipController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

//router.use(authController.protect);

router.route("/").get(membershipController.getAllMemberships).post(
  //authController.restrictTo("admin", "old-student", "set-admin"),
  membershipController.uploadMembershipImage,
  membershipController.resizeMembershipImage,
  membershipController.createMembership
);

router
  .route("/:id")
  .get(membershipController.getMembership)
  .patch(
    //authController.restrictTo("admin", "old-student", "set-admin"),
    membershipController.uploadMembershipImage,
    membershipController.resizeMembershipImage,
    membershipController.updateMembership
  )
  .delete(
    authController.restrictTo("admin", "set-admin"),
    membershipController.deleteMembership
  );

module.exports = router;
