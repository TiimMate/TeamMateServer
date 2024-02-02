import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import {
    ApplyGuestingUserPreview,
    matchingGuestingPreview,
    matchingHostingPreview,
    modifyGuestStatus,
    fetchHostingApplicantsTeamList,
    gameApplicationApproval,
} from "../controllers/matchings.controller";

export const matchingsRouter = express.Router({ mergeParams: true });

matchingsRouter.use(verifyUser);

matchingsRouter.get("/guesting", asyncHandler(matchingGuestingPreview));

matchingsRouter.get("/hosting", asyncHandler(matchingHostingPreview));

matchingsRouter.get("/hosting/:guestingId", asyncHandler(ApplyGuestingUserPreview));

matchingsRouter.put("/confirmGuest/:guestUserId", asyncHandler(modifyGuestStatus));

// 호스팅 내역 > 신청팀 목록 조회
matchingsRouter.get("/hosting/:gameId", asyncHandler(fetchHostingApplicantsTeamList));

// 호스팅 내역 > 신청 승인
matchingsRouter.post("/hosting/:gameId", asyncHandler(gameApplicationApproval));
