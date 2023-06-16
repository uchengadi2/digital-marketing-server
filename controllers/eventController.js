const multer = require("multer");
const sharp = require("sharp");
const Event = require("../models/EventModel");
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
//exports.uploadEventThumbnailImage = upload.single("thumbnail");

//for multiple images in a field that is an array, use the following
//exports.uploadImages = upload.array('images',3)

//for more than one file(multiple files)
exports.uploadEventImages = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: this.uploadImages, maxCount: 3 },
]);

exports.resizeEventImages = catchAsync(async (req, res, next) => {
  if (!req.files.thumbnail || !req.files.images) return next();

  //processing the thumbnail

  req.body.thumbnail = `event-${req.params.id}-${Date.now()}-thummbail.jpeg`;

  await sharp(req.files.thumbnail[0].buffer)
    .resize(2000, 1333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/events/${req.body.thumbnail}`);

  //processing other images
  req.body.images = [];
  await Promise.all(
    req.files.images.map(async (file, index) => {
      const filename = `event-${req.params.id}-${Date.now()}-${index + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/events/${filename}`);
      req.body.images.push(filename);
    })
  );

  next();
});

//get all Events
exports.getAllEvents = factory.getAll(Event);
//create a Event
exports.createEvent = factory.createOne(Event);

//get a Event
exports.getEvent = factory.getOne(Event);

//deleting a Event
exports.deleteEvent = factory.deleteOne(Event);

//updating a Event
exports.updateEvent = factory.updateOne(Event);
