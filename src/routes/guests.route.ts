import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { categoryParam, dateParam, genderParam, levelParam, regionParam } from "../schemas/fields";
import { createGuestingSchema, updateGuestingSchema } from "../schemas/guest.schema";
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

export const guestsRouter = express.Router();

guestsRouter.use(verifyUser);

guestsRouter.post("/", verifyUser, validate(createGuestingSchema), asyncHandler(addGuesting));

guestsRouter.put("/:guestingId", verifyUser, validate(updateGuestingSchema), asyncHandler(modifyGuesting));

guestsRouter.get("/", validate(categoryParam), validate(dateParam), asyncHandler(GuestingPreview));

guestsRouter.get(
    "/level",
    validate(categoryParam),
    validate(dateParam),
    validate(levelParam),
    asyncHandler(GuestingPreviewByLevel),
);

guestsRouter.get(
    "/gender",
    validate(categoryParam),
    validate(dateParam),
    validate(genderParam),
    asyncHandler(GuestingPreviewByGender),
);

guestsRouter.get(
    "/region",
    validate(categoryParam),
    validate(dateParam),
    validate(regionParam),
    asyncHandler(GuestingPreviewByRegion),
);

guestsRouter.get("/:guestingId", asyncHandler(DetailedGuestingPreview));

guestsRouter.post("/application/:category/:guestingId", verifyUser, asyncHandler(applicationGuesting));
