import express from 'express';
import * as discomController from '../controllers/discomController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all DISCOM applications for a user
router.get('/applications/user/:userId', authenticate, discomController.getUserApplications);

// Get a specific application by ID
router.get('/applications/:applicationId', authenticate, discomController.getApplicationById);

// Submit a new net-metering application
router.post('/applications', authenticate, discomController.submitApplication);

// Get application status with timeline
router.get('/status/:userId', authenticate, discomController.getApplicationStatus);

// Simulate approval process (for demo)
router.post('/applications/:applicationId/process', authenticate, discomController.processApplication);

// Get grid sync status for a meter
router.get('/grid-sync/:meterId', authenticate, discomController.getGridSyncStatus);

// Update grid sync status (for simulation)
router.post('/grid-sync/:meterId/sync', authenticate, discomController.updateGridSync);

export default router;

