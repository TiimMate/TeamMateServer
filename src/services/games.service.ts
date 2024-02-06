import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import {
    findGamesByDate,
    findGamesByGender,
    findGamesByLevel,
    findGamesByRegion,
    getGameDetail,
    insertGame,
    setGame,
    insertGameApplication,
} from "../daos/games.dao";
import {
    getTeamDetailforGuesting,
    getTeamIdByLeaderId,
    getTeamCategoryByLeaderId,
    getTeamByLeaderId,
} from "../daos/team.dao";
import {
    findMemberInfoWithoutLeaderByTeamId,
    getMemberInfoByCategory,
    getMemberCountByTeamId,
} from "../daos/member.dao";
import { getUserInfoByCategory, userInfoAttributes } from "../daos/user.dao";
import { getGameByUserId } from "../daos/games.dao";
import { readGameResponseDTO, readGameDetailResponseDTO } from "../dtos/games.dto";
import { CreateGameBody, UpdateGameBody } from "../schemas/game.schema";
import { ApplyGameBody } from "../schemas/game-apply.schema";

export const readGamesByDate = async (query) => {
    const games = await findGamesByDate(query.date, query.category);
    for (const game of games) {
        game.memberCount = await getMemberCountByTeamId(game["HostTeam.id"]);
    }
    return readGameResponseDTO(games);
};

export const readGamesByGender = async (query) => {
    const games = await findGamesByGender(query.date, query.category, query.gender);
    for (const game of games) {
        game.memberCount = await getMemberCountByTeamId(game["HostTeam.id"]);
    }
    return readGameResponseDTO(games);
};

export const readGamesByLevel = async (query) => {
    const games = await findGamesByLevel(query.date, query.category, query.skillLevel);
    for (const game of games) {
        game.memberCount = await getMemberCountByTeamId(game["HostTeam.id"]);
    }
    return readGameResponseDTO(games);
};

export const readGamesByRegion = async (query) => {
    const games = await findGamesByRegion(query.date, query.category, query.region);
    for (const game of games) {
        game.memberCount = await getMemberCountByTeamId(game["HostTeam.id"]);
    }
    return readGameResponseDTO(games);
};

export const readGameDetail = async (params) => {
    const gameId = params.gameId;
    const gameDetail = await getGameDetail(gameId);
    const teamDetail = await getTeamDetailforGuesting(gameDetail.hostTeamId);
    const leaderInfo = await getUserInfoByCategory(teamDetail.leaderId, teamDetail.category);
    const memberInfo = await getMemberInfoByCategory(gameDetail.hostTeamId, teamDetail.category);
    return readGameDetailResponseDTO(gameDetail, teamDetail, leaderInfo, memberInfo);
};

export const createGame = async (userId, body: CreateGameBody) => {
    const hostTeamId = await getTeamIdByLeaderId(userId);
    const category = await getTeamCategoryByLeaderId(userId);

    const team = await getTeamByLeaderId(hostTeamId, userId);
    if (!team) {
        // team 메뉴로 이동
    }

    await insertGame(hostTeamId, body, category);
    return;
};

export const updateGame = async (userId, params, body: UpdateGameBody) => {
    const gameId = params.gameId;
    const game = await getGameByUserId(gameId, userId);
    if (!game) {
        throw new BaseError(status.GAME_NOT_FOUND);
    }
    await setGame(game, body);
    return;
};

export const addGameApplication = async (params, body: ApplyGameBody) => {
    const gameId = params.gameId;

    await insertGameApplication(gameId, body);
    return;
};
