import express from "express";
import asyncHandler from "express-async-handler";
import {
    ApplyGuestingUserPreview,
    matchingGuestingPreview,
    matchingHostingPreview,
} from "../controllers/matchings.controller";

export const matchingsRouter = express.Router({ mergeParams: true });

matchingsRouter.get("/guesting", asyncHandler(matchingGuestingPreview));

matchingsRouter.get("/hosting", asyncHandler(matchingHostingPreview));

matchingsRouter.get("/hosting/appliedGuests/:guestingId", asyncHandler(ApplyGuestingUserPreview));

matchingsRouter.get("/hosting/appliedGames/:gameId", asyncHandler(matchingHostingPreview));
