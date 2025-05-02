import express from 'express'
import { strictapiLimiter } from '../middlewares/rateLimiter.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/token', strictapiLimiter, protectedRoute, getStreamToken);

export default router;