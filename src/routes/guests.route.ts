import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
    addGuestUserSchema,
    createGuestingSchema,
    readGuestFilterGenderSchema,
    readGuestFilterLevelSchema,
    readGuestFilterRegionSchema,
    readGuestSchema,
    updateGuestingSchema,
} from "../schemas/guest.schema";
import {
    GuestingPreview,
    GuestingPreviewByLevel,
    GuestingPreviewByGender,
    GuestingPreviewByRegion,
    DetailedGuestingPreview,
    addGuesting,
    modifyGuesting,
    applicationGuesting,
} from "../controllers/guests.controller";

export const guestsRouter = express.Router();

guestsRouter.post("/", verifyUser, validate(createGuestingSchema), asyncHandler(addGuesting));
// guestsRouter.post("/", validate(createGuestingSchema), asyncHandler(addGuesting));

guestsRouter.put("/:guestingId", verifyUser, validate(updateGuestingSchema), asyncHandler(modifyGuesting));
// guestsRouter.put("/:guestingId", validate(updateGuestingSchema), asyncHandler(modifyGuesting));

guestsRouter.get("/", validate(readGuestSchema), asyncHandler(GuestingPreview));

guestsRouter.get("/level", validate(readGuestFilterLevelSchema), asyncHandler(GuestingPreviewByLevel));

guestsRouter.get("/gender", validate(readGuestFilterGenderSchema), asyncHandler(GuestingPreviewByGender));

guestsRouter.get("/region", validate(readGuestFilterRegionSchema), asyncHandler(GuestingPreviewByRegion));

guestsRouter.get("/:guestingId", asyncHandler(DetailedGuestingPreview));

guestsRouter.post(
    "/:guestingId/application",
    verifyUser,
    validate(addGuestUserSchema),
    asyncHandler(applicationGuesting),
);
// guestsRouter.put("/:guestingId", validate(updateGuestingSchema), asyncHandler(applicationGuesting));
