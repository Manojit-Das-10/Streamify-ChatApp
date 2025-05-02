import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs} from "../controllers/user.controller.js";
import { generalapiLimiter, strictapiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Apply auth middleware to all routes in this router
router.use(protectedRoute);

router.get("/",generalapiLimiter, getRecommendedUsers);
router.get("/friends",strictapiLimiter, getMyFriends);

router.post("/friend-request/:id",strictapiLimiter, sendFriendRequest)
router.put("/friend-request/:id/accept",strictapiLimiter, acceptFriendRequest)

router.get("/friend-requests",generalapiLimiter, getFriendRequests);
router.get("/outgoing-friend-requests", generalapiLimiter, getOutgoingFriendReqs);

export default router;