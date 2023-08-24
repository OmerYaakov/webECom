import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import fs from 'fs/promises'; // Note the change in import for fs

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME; // Remove extra space characters
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});

async function uploadFile(file) {
    const fileStream = await fs.readFile(file.path); // Use fs.promises.readFile

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log('File uploaded successfully', data);
        return data;
    } catch (error) {
        console.error('Error uploading file', error);
        throw error;
    }
}

export {
    uploadFile
};
