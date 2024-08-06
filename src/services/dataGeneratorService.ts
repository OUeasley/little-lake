// src/services/dataGeneratorService.ts

import { Readable } from 'stream';

export interface LogEvent {
    timestamp: string;
    level: string;
    message: string;
    source: string;
    host: string;
    service: string;
    eventId: string;
}

export class DataGeneratorService {
    private static levels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
    private static sources = ['app', 'system', 'auth', 'network'];
    private static hosts = ['host1', 'host2', 'host3', 'host4'];
    private static services = ['web', 'database', 'cache', 'auth'];

    static generateNdjsonStream(count: number): Readable {
        let generated = 0;
        return new Readable({
            objectMode: true,
            read() {
                if (generated < count) {
                    this.push(JSON.stringify(DataGeneratorService.generateLogEvent()) + '\n');
                    generated++;
                } else {
                    this.push(JSON.stringify(DataGeneratorService.generateLogEvent()));
                    this.push(null)
                }
            }
        });
    }

    private static generateLogEvent(): LogEvent {
        return {
            timestamp: new Date().toISOString(),
            level: this.getRandomElement(this.levels),
            message: `Log message ${Math.random().toString(36).substring(7)}`,
            source: this.getRandomElement(this.sources),
            host: this.getRandomElement(this.hosts),
            service: this.getRandomElement(this.services),
            eventId: this.generateUUID()
        };
    }

    private static getRandomElement<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    private static generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}