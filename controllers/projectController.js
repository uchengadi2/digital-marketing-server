const multer = require("multer");
const sharp = require("sharp");
const Project = require("../models/ProjectModel");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

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
exports.uploadProjectThumbnailImage = upload.single("thumbnail");

exports.resizeProjectThumbnailImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  //1. start by processing the cover image
  // req.body.image = `${req.body.name.split(" ")[0]}-${
  //   req.body.createdBy
  // }-${Date.now()}-cover.jpeg`;
  req.body.thumbnail = `${req.body.createdBy}-${Date.now()}-${
    req.file.originalname
  }`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/projects/${req.body.thumbnail}`);

  next();
});

//get all Projects
exports.getAllProjects = factory.getAll(Project);
//create a Project
exports.createProject = factory.createOne(Project);

//get a Project
exports.getProject = factory.getOne(Project);

//deleting a Project
exports.deleteProject = factory.deleteOne(Project);

//updating a Project
exports.updateProject = factory.updateOne(Project);
