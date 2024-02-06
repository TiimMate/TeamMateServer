import express from "express";
import asyncHandler from "express-async-handler";
import { verifyUser } from "../middlewares/auth.middleware";
import { categoryParam, dateParam, genderParam, levelParam, regionParam } from "../schemas/fields";
import {
    fetchGamesByDate,
    fetchGamesByGender,
    fetchGamesByLevel,
    fetchGamesByRegion,
    fetchTeamsAvailById,
    fetchGameDetail,
    addGame,
    modifyGame,
    applyGame,
} from "../controllers/games.controller";
import { createGameSchema, updateGameSchema } from "../schemas/game.schema";
import { validate } from "../middlewares/validate.middleware";

export const gamesRouter = express.Router();

// 날짜별 연습경기 모집글 조회 (기본)
gamesRouter.get("/", asyncHandler(fetchGamesByDate));

// 연습경기 모집글 필터링 - 성별/레벨/지역
gamesRouter.get(
    "/by-gender",
    validate(categoryParam),
    validate(dateParam),
    validate(genderParam),
    asyncHandler(fetchGamesByGender),
);

gamesRouter.get(
    "/by-level",
    validate(categoryParam),
    validate(dateParam),
    validate(levelParam),
    asyncHandler(fetchGamesByLevel),
);

gamesRouter.get(
    "/by-region",
    validate(categoryParam),
    validate(dateParam),
    validate(regionParam),
    asyncHandler(fetchGamesByRegion),
);

// 연습경기 신청 가능 팀 목록 조회
gamesRouter.get("/apply-avail", asyncHandler(fetchTeamsAvailById));

// 연습경기 신청
gamesRouter.post("/:gameId/application", verifyUser, asyncHandler(applyGame));

// 연습경기 모집글 상세 조회
gamesRouter.get("/:gameId", verifyUser, asyncHandler(fetchGameDetail));

// 연습경기 모집글 작성/수정
gamesRouter.post("/", verifyUser, validate(createGameSchema), asyncHandler(addGame));
gamesRouter.put("/:gameId", verifyUser, validate(updateGameSchema), asyncHandler(modifyGame));
