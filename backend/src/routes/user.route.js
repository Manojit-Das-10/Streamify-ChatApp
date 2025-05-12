import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import { getMyFriends, getRecommendedUsers, sendFriendRequest, acceptFriendRequest, getFriendRequests, getOutgoingFriendReqs} from "../controllers/user.controller.js";
import { generalapiLimiter, strictapiLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Apply middleware to all routes in this router
router.use(generalapiLimiter, protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

export default router;