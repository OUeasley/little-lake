// src/server/app.ts

import express from 'express';
import bodyParser from 'body-parser';
import { dataIngestionRouter } from './routes/dataIngestion';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'application/x-ndjson' }));

app.use('/ingest', dataIngestionRouter);

export default app;

