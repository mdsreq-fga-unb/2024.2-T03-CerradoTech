require("dotenv")

module.exports = { 
    s3: {
        accessKeyId: process.env.AWS_S3_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
        bucket: process.env.AWS_S3_BUCKET,
        region: "sa-east-1"
    },
}