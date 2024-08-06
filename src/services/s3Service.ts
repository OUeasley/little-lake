// src/services/s3Service.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { config, S3_BUCKET_NAME } from '../config/s3ninja-config';

export class S3Service {
    private s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client(config);
    }

    async uploadParquetFile(key: string, data: Buffer): Promise<void> {
        const params = {
            Bucket: S3_BUCKET_NAME,
            Key: key,
            Body: data,
            ContentType: 'application/octet-stream', // TODO: Fix this content type for Parquet files
        };

        try {
            // TODO: Implement proper error handling and retries
            const command = new PutObjectCommand(params);
            await this.s3Client.send(command);
            console.log(`File uploaded successfully: ${key}`);
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw error;
        }
    }

    // TODO: Implement additional methods for S3 operations as needed
}