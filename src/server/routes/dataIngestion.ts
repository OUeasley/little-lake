import express from 'express';
import { LakeDestinationService } from '../../services/lakeDestinationService';

const router = express.Router();
const lakeDestinationService = new LakeDestinationService();

router.post('/data', async (req, res) => {
    try {
        const ndjsonData = req.body;
        // TODO: Implement batching and processing logic in LakeDestinationService
        await lakeDestinationService.processData(ndjsonData);
        res.status(200).json({ message: 'Data received and processing initiated' });
    } catch (error) {
        console.error('Error processing data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export const dataIngestionRouter = router;