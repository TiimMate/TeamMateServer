import express from "express";
import asyncHandler from "express-async-handler";
import {
    fetchGamesByDate,
    fetchGamesByGender,
    fetchGamesByLevel,
    fetchGamesByRegion,
} from "../controllers/games.controller";

export const gamesRouter = express.Router();

// 날짜별 연습경기 모집글 조회 (기본)
gamesRouter.get("/", asyncHandler(fetchGamesByDate));

// 연습경기 모집글 필터링 - 성별/레벨/지역
gamesRouter.get("/:teamId", asyncHandler(fetchGamesByGender));
gamesRouter.get("/:teamId", asyncHandler(fetchGamesByLevel));
gamesRouter.get("/:teamId", asyncHandler(fetchGamesByRegion));
