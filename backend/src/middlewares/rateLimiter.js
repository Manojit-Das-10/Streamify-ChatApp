import rateLimit from 'express-rate-limit';

// Limit each IP to 100 requests per 15 minutes
export const generalapiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes.",
    standardHeaders: true,
    legacyHeaders: false,
});

export const strictapiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: "Too many attempts. Please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

