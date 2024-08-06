// src/config/s3ninja-config.ts

import { S3ClientConfig } from "@aws-sdk/client-s3";

export const config: S3ClientConfig = {
    //these aren't real credentials you bastards
    credentials: {
        accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
        secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
    },
    endpoint: 'http://localhost:9000',
    region: 'us-east-1',
    forcePathStyle: true,
};

// You can add more configurations here if needed for your specific setup
export const S3_BUCKET_NAME = 'little-lake';