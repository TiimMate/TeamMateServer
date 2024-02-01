import express from "express";
import asyncHandler from "express-async-handler";
import {
    matchingGuestingPreview,
    matchingHostingPreview,
    fetchHostingApplicantsTeamList,
} from "../controllers/matchings.controller";

export const matchingsRouter = express.Router({ mergeParams: true });

matchingsRouter.get("/guesting", asyncHandler(matchingGuestingPreview));

matchingsRouter.get("/hosting", asyncHandler(matchingHostingPreview));

// 호스팅 내역 > 신청팀 목록 조회
matchingsRouter.get("/hosting/:gameId", asyncHandler(fetchHostingApplicantsTeamList));
