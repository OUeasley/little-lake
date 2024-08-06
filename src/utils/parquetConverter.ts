import {ParquetReader, ParquetSchema, ParquetWriter} from '@dsnp/parquetjs';
import {Writable} from "node:stream";

export class ParquetConverter {
    private schema: ParquetSchema;

    constructor() {
        // Define the schema for our data
        this.schema = new ParquetSchema({
            timestamp: { type: 'TIMESTAMP_MILLIS' },
            level: { type: 'UTF8' },
            message: { type: 'UTF8' },
            // Add more fields as needed
        });
    }

    async convertToParquet(jsonData: string): Promise<Buffer> {
        // Parse JSON data
        const jsonObjects = jsonData.split('\n').map(line => JSON.parse(line));

        const chunks: Buffer[] = [];
        const outputStream = new Writable({
            write(chunk, encoding, callback) {
                chunks.push(Buffer.from(chunk));
                callback();
            }
        });

        // Create a new ParquetWriter instance
        // @ts-ignore
        const writer = await ParquetWriter.openStream(this.schema, outputStream);

        // Write each object to the Parquet file
        for (const obj of jsonObjects) {
            await writer.appendRow(obj);
        }

        // Close the writer and get the Buffer
        await writer.close();
        return Buffer.concat(chunks);
    }

    async readParquet(parquetBuffer: Buffer): Promise<any[]> {
        // Create a new ParquetReader instance
        const reader = await ParquetReader.openBuffer(parquetBuffer);

        // Create a cursor to read the data
        const cursor = reader.getCursor();

        const results: any[] = [];
        let record = null;
        while (record = await cursor.next()) {
            results.push(record);
        }

        // Close the reader
        await reader.close();

        return results;
    }
}