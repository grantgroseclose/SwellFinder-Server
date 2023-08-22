const express = require("express");
const router = express.Router();

const apisauce = require('apisauce');




const awsClient = apisauce.create({
    method: "PUT",
    baseURL: "https://swellfinder-md-images.s3.amazonaws.com",
    headers: {
        "Content-Type": "image/jpeg"
    }
});


module.exports = awsClient;
