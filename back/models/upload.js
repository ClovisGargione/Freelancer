const mongoose = require('../database');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

const s3 = new aws.S3();

module.exports = function(app) {
    const UploadSchema = new mongoose.Schema({
        name: String,
        size: Number,
        key: String,
        url: String,
        creatAt: {
            type: Date,
            default: Date.now
        }
    });
    
    UploadSchema.pre('save', function() {
        if(!this.url){
            this.url = `${process.env.APP_URL}/files/${this.key}`
        }
    });

    UploadSchema.pre('remove', function() {
        if(process.env.STORAGE_TYPE === 's3'){
            return s3.deleteObject({
                Bucket: 'uploadimages2',
                Key: this.key
            }).promise();
        } else {
            return promisify(fs.unlink)(path.resolve(__dirname, '..', 'temp', 'uploads', this.key));
        }
    });

    return mongoose.model('Upload', UploadSchema);
};