import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser, verifyUserIfExists } from "../middlewares/auth.middleware";
import {
    addCommunityComment,
    // addCommunityPost,
    // addOrRemoveBookmark,
    fetchCommunityComments,
    // fetchCommunityPost,
    // fetchCommunityPosts,
} from "../controllers/community-posts.controller";
// import { createCommunityPost } from "../schemas/community-post.schema";
import { validateBody } from "../middlewares/validate.middleware";
import { createCommunityComment } from "../schemas/community-comment.schema";

export const communityPostsRouter = express.Router();

// communityPostsRouter.post("/", verifyUser, validateBody(createCommunityPost), asyncHandler(addCommunityPost));

// communityPostsRouter.get("/", verifyUserIfExists, asyncHandler(fetchCommunityPosts));

// communityPostsRouter.post("/:postId/bookmark", verifyUser, asyncHandler(addOrRemoveBookmark));

communityPostsRouter.post(
    "/:postId/comments",
    verifyUser,
    validateBody(createCommunityComment),
    asyncHandler(addCommunityComment),
);

communityPostsRouter.get("/:postId/comments", verifyUser, asyncHandler(fetchCommunityComments));

// communityPostsRouter.get("/:postId", verifyUser, asyncHandler(fetchCommunityPost));
