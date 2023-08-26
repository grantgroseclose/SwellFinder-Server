const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");

const validateWith = require("../middleware/validation");

const UserModel = require('../models/Users');

const validationSchema = Joi.object({
    name: Joi.string().required().min(2),
    username: Joi.string().required().min(6).max(18),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(18),
});

router.post("/", validateWith(validationSchema), async (req, res) => {
    const usernameTaken = await UserModel.exists({ username: req.body.username });
    const emailTaken = await UserModel.exists({ email: req.body.email });

    if (usernameTaken) {
        return res.status(400).send({ error: "Username already taken." });
    } else if (emailTaken) {
        return res.status(400).send({ error: "Email already taken." });
    } else {
        const hashed_pass = await bcrypt.hash(req.body.password, 10);
        const newUser = new UserModel({
            name: req.body.name, 
            username: req.body.username,
            email: req.body.email,
            password: hashed_pass
        });
        const user = await UserModel.create(newUser);
        res.status(201).send(user);
    }
});

module.exports = router;
