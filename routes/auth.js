const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const validateWith = require("../middleware/validation");
const bcrypt = require("bcrypt");

const UserModel = require('../models/Users');




const validationSchema = Joi.object({
  username: Joi.string().required().min(6).max(18),
  password: Joi.string().required().min(6).max(18)
});

router.post("/", validateWith(validationSchema), async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send({ error: "User does not exist." });
    }

    const comp = await bcrypt.compare(req.body.password, user.password);
    if (!comp) {
      return res.status(400).send({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      {
        name: user.name,
        userId: user._id,
        username: user.username, 
        email: user.email
      },
      "jwtPrivateKey",
      { expiresIn: "24h" }
    );

    res.send(token);
});

module.exports = router;
