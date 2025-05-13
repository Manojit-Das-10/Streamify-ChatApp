import express from 'express'
import { generalapiLimiter, strictapiLimiter } from '../middlewares/rateLimiter.js';
import { protectedRoute } from '../middlewares/auth.middleware.js';
import { getStreamToken } from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/token', protectedRoute, getStreamToken);

export default router;