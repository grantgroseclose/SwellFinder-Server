const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const validateWith = require("../middleware/validation");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");
const config = require("config");
const c = require("config");
const imageResize = require("../middleware/imageResize");
const ip = require('ip');

const SpotModel = require('../models/Spots');

const validationSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    latitude: Joi.string().min(5).required(),
    longitude: Joi.string().min(5).required()
});



router.get("/", auth, async (req, res) => {
  try {
      const data = await SpotModel.find({});
      const filtered_spots = data.filter(spot => spot.userId === req.user.userId);
      res.send(filtered_spots);
  } catch (error) {
      res.status(500).json({ error: "An unexpected error has occured fetching spots."});
  }
});

router.post("/", [auth, upload.single('image'), validateWith(validationSchema), imageResize], async (req, res) => {
    const newSpot = new SpotModel({
      userId: req.user.userId,
      name: req.body.name,
      description: req.body.description,
      location: {
        'latitude': parseFloat(parseFloat(req.body.latitude).toFixed(2)),
        'longitude': parseFloat(parseFloat(req.body.longitude).toFixed(2))
      },
      // image: `http://10.0.0.86:9000/assets/${req.file.filename}.jpg`
      image: `http://${ip.address()}:9000/assets/${req.file.filename}.jpg`
    });
    const spot = await SpotModel.create(newSpot);
    res.status(201).send(spot);
});

module.exports = router;
