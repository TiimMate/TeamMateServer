import express from "express";
import asyncHandler from "express-async-handler";
import {
    GuestingPreview,
    // GuestingPreviewByLevel,
    GuestingPreviewByGender,
    GuestingPreviewByRegion,
} from "../controllers/guest.controller";

export const guestsRouter = express.Router({ mergeParams: true });

// guestRouter.post("/", asyncHandler(createGuesting));

guestsRouter.get("/", asyncHandler(GuestingPreview));

// guestsRouter.get("/level", asyncHandler(GuestingPreviewByLevel));

guestsRouter.get("/gender", asyncHandler(GuestingPreviewByGender));

guestsRouter.get("/region", asyncHandler(GuestingPreviewByRegion));

// guestRouter.get("/:guestId", asyncHandler(DetailedGuestingPreview));
