const multer = require("multer");
const sharp = require("sharp");
const Membership = require("../models/MembershipModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/public/images/membership");
//   },
//   filename: function (req, file, cb) {
//     console.log("body:", req.body);
//     console.log("file is:", file);
//     const ext = file.mimetype.split("/")[1];
//     //cb(null, `member-${req.membership.id}-${Date.now()}.${ext}`);
//     cb(null, `member-${Date.now()}.${ext}`);
//   },
// });

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Please upload an image file", 400), false);
//   }
// };

//const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

//const upload = multer({ dest: "public/images/membership" });

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

const multerStorage = multer.memoryStorage();

//create a multer filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("this file is not an image, Please upload only images", 404),
      false
    );
  }
};

//const upload = multer({ dest: "public/images/users" });

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

//when uploading a single file
exports.uploadMembershipImage = upload.single("image");

// exports.resizeMembershipImage = catchAsync(async (req, res, next) => {
//   if (!req.file) return next();

//   //1. start by processing the cover image
//   req.body.image = `${req.body.name.split(" ")[0]}-${
//     req.body.createdBy
//   }-${Date.now()}-cover.jpeg`;

//   await sharp(req.file.buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/images/membership/${req.body.image}`);

//   next();
// });

exports.resizeMembershipImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  // req.body.image = `${req.body.name.split(" ")[0]}-${
  //   req.body.createdBy
  // }-${Date.now()}-cover.jpeg`;
  req.body.image = `${req.body.user}-${Date.now()}-${req.file.originalname}`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/membership/${req.body.image}`);

  next();
});

//get all memberships
exports.getAllMemberships = factory.getAll(Membership);
//create a Channel
exports.createMembership = factory.createOne(Membership);

//get a membership
exports.getMembership = factory.getOne(Membership);

//deleting a membership
exports.deleteMembership = factory.deleteOne(Membership);

//updating a membership
exports.updateMembership = factory.updateOne(Membership);
