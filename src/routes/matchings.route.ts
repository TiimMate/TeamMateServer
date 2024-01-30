import express from "express";
import asyncHandler from "express-async-handler";
import {
    matchingGuestingPreview,
    // matchingHostingPreview
} from "../controllers/matchings.controller";

export const matchingsRouter = express.Router({ mergeParams: true });

matchingsRouter.get("/guesting", asyncHandler(matchingGuestingPreview));

// matchingsRouter.get("/hosting", asyncHandler(matchingHostingPreview));
