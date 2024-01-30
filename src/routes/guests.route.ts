import express from "express";
import asyncHandler from "express-async-handler";
import {
    GuestingPreview,
    GuestingPreviewByLevel,
    GuestingPreviewByGender,
    GuestingPreviewByRegion,
    DetailedGuestingPreview,
    addGuesting,
    modifyGuesting,
    applicationGuesting,
} from "../controllers/guest.controller";
import { createGuesting, updateGuesting } from "../schemas/guest.schema";
import { validateBody } from "../middlewares/validate.middleware";

export const guestsRouter = express.Router({ mergeParams: true });

guestsRouter.post("/", validateBody(createGuesting), asyncHandler(addGuesting));
// guestsRouter.post("/", asyncHandler(addGuesting));

guestsRouter.put("/:guestingId", validateBody(updateGuesting), asyncHandler(modifyGuesting));
// guestsRouter.put("/:guestingId", asyncHandler(modifyGuesting));

guestsRouter.get("/", asyncHandler(GuestingPreview));

guestsRouter.get("/level", asyncHandler(GuestingPreviewByLevel));

guestsRouter.get("/gender", asyncHandler(GuestingPreviewByGender));

guestsRouter.get("/region", asyncHandler(GuestingPreviewByRegion));

guestsRouter.get("/:guestingId", asyncHandler(DetailedGuestingPreview));

guestsRouter.post("/:guestingId/application", asyncHandler(applicationGuesting));
