// src/services/lakeDestinationService.ts

import { S3Service } from './s3Service';
import { ParquetConverter } from '../utils/parquetConverter';

export class LakeDestinationService {
    private s3Service: S3Service;
    private parquetConverter: ParquetConverter;

    constructor() {
        this.s3Service = new S3Service();
        this.parquetConverter = new ParquetConverter();
    }

    async processData(ndjsonData: string): Promise<void> {
        // TODO: Implement batching logic here
        const batches = this.batchData(ndjsonData);

        for (const batch of batches) {
            // TODO: Implement Parquet conversion
            const parquetData = await this.parquetConverter.convertToParquet(batch);

            // TODO: Implement S3 upload with proper error handling and retries
            await this.s3Service.uploadParquetFile('little-cave', parquetData);
        }
    }

    private batchData(ndjsonData: string): string[] {
        // TODO: Implement proper batching logic
        return [ndjsonData];
    }
}