// src/index.ts

import app from './server/app';
import { DataGeneratorService } from './services/dataGeneratorService';
import axios from 'axios';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Simulate data generation and sending
setInterval(async () => {
    const data = DataGeneratorService.generateNdjsonStream(5);
    let ndjsonData = '';
    for await (const chunk of data) {
        ndjsonData += chunk;
    }

    try {
        await axios.post('http://localhost:' + PORT + '/ingest/data', ndjsonData, {
            headers: { 'Content-Type': 'application/x-ndjson' }
        });
        console.log('Data sent successfully');
    } catch (error) {
        console.error('Error sending data:', error);
    }
}, 5000);