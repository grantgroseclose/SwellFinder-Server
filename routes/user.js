const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");
const validateWith = require("../middleware/validation");

const UserModel = require("../models/Users");

const schema = Joi.object({
    name: Joi.string().required().min(2),
    username: Joi.string().required().min(6),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
});




router.post("/", [validateWith(schema), auth], async (req, res) => {
    const hashed_pass = await bcrypt.hash(req.body.password, 10);
    const user = await UserModel.findOneAndUpdate({
        name: req.body.name, 
        username: req.body.username,
        email: req.body.email
    }, {
        password: hashed_pass
    }, {
        new: true
    });
    res.status(201).send(user);
});


module.exports = router;
