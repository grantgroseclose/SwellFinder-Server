const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 52428800 }
});

const moment = require("moment");

const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const generateUploadURL = require('../s3');
const awsClient = require('./aws');

const SpotModel = require('../models/Spots');

const validationSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    latitude: Joi.string().min(5).required(),
    longitude: Joi.string().min(5).required()
});

const generateRandomFileKey = (currentName) => {
    return `${moment().unix().toString()}${currentName}${Math.random().toString(36).slice(2,7)}`;
};





router.get("/", auth, async (req, res) => {
  try {
      const data = await SpotModel.find({});
      const filtered_spots = data.filter(spot => spot.userId === req.user.userId);
      res.send(filtered_spots);
  } catch (error) {
      res.status(500).json({ error: "An unexpected error has occured fetching spots."});
  }
});

router.post("/", [auth, upload.single('image'), validateWith(validationSchema)], async (req, res) => {
    const randomFileKey = generateRandomFileKey(req.file.originalname);
    const awsFileName = await generateUploadURL(randomFileKey);
    const awsFileNameWithoutExtension = awsFileName.split("?")[0];

    await awsClient.put(
      `${randomFileKey}?${awsFileName.split('?')[1]}`,
      req.file.buffer
    );

    const newSpot = new SpotModel({
      userId: req.user.userId,
      name: req.body.name,
      description: req.body.description,
      location: {
        'latitude': parseFloat(parseFloat(req.body.latitude).toFixed(2)),
        'longitude': parseFloat(parseFloat(req.body.longitude).toFixed(2))
      },
      image: awsFileNameWithoutExtension
    });
    const spot = await SpotModel.create(newSpot);
    res.status(201).send(spot);
});

module.exports = router;
