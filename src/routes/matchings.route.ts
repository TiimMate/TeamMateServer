import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { dateParam } from "../schemas/fields";
import {
    matchingGuestingPreview,
    matchingHostingPreview,
    ApplyGuestingUserPreview,
    modifyGuestStatus,
    fetchHostingApplicantsTeamList,
    gameApplicationApproval,
} from "../controllers/matchings.controller";

export const matchingsRouter = express.Router();

matchingsRouter.use(verifyUser);

matchingsRouter.get("/guesting", verifyUser, validate(dateParam), asyncHandler(matchingGuestingPreview));

matchingsRouter.get("/hosting", verifyUser, validate(dateParam), asyncHandler(matchingHostingPreview));

matchingsRouter.get("/hosting/:guestingId", asyncHandler(ApplyGuestingUserPreview));

matchingsRouter.put("/confirmGuest/:guestUserId", asyncHandler(modifyGuestStatus));

// 호스팅 내역 > 신청팀 목록 조회
matchingsRouter.get("/hosting/team/:gameId", asyncHandler(fetchHostingApplicantsTeamList));

// 호스팅 내역 > 신청 승인
matchingsRouter.patch("/hosting/team/:gameId", asyncHandler(gameApplicationApproval));
