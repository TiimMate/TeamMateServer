import express from "express";
import asyncHandler from "express-async-handler";
import {
    fetchGamesByDate,
    fetchGamesByGender,
    fetchGamesByLevel,
    fetchGamesByRegion,
    fetchTeamsAvailById,
} from "../controllers/games.controller";

export const gamesRouter = express.Router();

// 날짜별 연습경기 모집글 조회 (기본)
gamesRouter.get("/", asyncHandler(fetchGamesByDate));

// 연습경기 모집글 필터링 - 성별/레벨/지역
gamesRouter.get("/by-gender", asyncHandler(fetchGamesByGender));
gamesRouter.get("/by-level", asyncHandler(fetchGamesByLevel));
gamesRouter.get("/by-region", asyncHandler(fetchGamesByRegion));

// 연습경기 신청 가능 팀 목록 조회
gamesRouter.get("/apply-avail", asyncHandler(fetchTeamsAvailById));
