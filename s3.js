const aws = require("aws-sdk");




const region = "us-east-1";
const bucketName = "swellfinder-md-images";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});




const generateUploadURL = async (fileName) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Expires: 60
    };


    const uploadURL = await s3.getSignedUrlPromise('putObject', params);

    return uploadURL;
}








module.exports = generateUploadURL;

