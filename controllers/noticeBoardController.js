const multer = require("multer");
const sharp = require("sharp");
const NoticeBoard = require("../models/NoticeBoardModel");
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
exports.uploadNoticeThumbnailImage = upload.single("thumbnail");

exports.resizeNoticeThumbnailImage = catchAsync(async (req, res, next) => {
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
    .toFile(`public/images/noticeboards/${req.body.thumbnail}`);

  next();
});

//get all NoticeBoards
exports.getAllNoticeBoards = factory.getAll(NoticeBoard);
//create a NoticeBoard
exports.createNoticeBoard = factory.createOne(NoticeBoard);

//get a NoticeBoard
exports.getNoticeBoard = factory.getOne(NoticeBoard);

//deleting a NoticeBoard
exports.deleteNoticeBoard = factory.deleteOne(NoticeBoard);

//updating a NoticeBoard
exports.updateNoticeBoard = factory.updateOne(NoticeBoard);
