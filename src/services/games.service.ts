// import { BaseError } from "../config/error";
// import { status } from "../config/response.status";
import db from "../models";
import {
    findGamesByDate,
    findGamesByGender,
    findGamesByLevel,
    findGamesByRegion,
    getGameDetail,
    insertGame,
} from "../daos/games.dao";
import {
    getTeamDetailforGuesting,
    getTeamIdByLeaderId,
    getTeamCategoryByLeaderId,
    getTeamById,
} from "../daos/team.dao";
import {
    findMemberInfoByTeamId,
    findMemberInfoWithoutLeaderByTeamId,
    getMemberCountByTeamId,
} from "../daos/member.dao";
import { getUserInfoById, userInfoAttributes } from "../daos/user.dao";
import { readGameResponseDTO, readGameDetailResponseDTO } from "../dtos/games.dto";
import { CreateGameSchema } from "../schemas/game.schema";

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
    const leaderInfo = await getUserInfoById(teamDetail.leaderId);
    const memberInfo = await findMemberInfoWithoutLeaderByTeamId(gameDetail.hostTeamId, userInfoAttributes);
    return readGameDetailResponseDTO(gameDetail, teamDetail, leaderInfo, memberInfo);
};

export const createGame = async (userId, body: CreateGameSchema) => {
    const hostTeamId = await getTeamIdByLeaderId(userId);
    const category = await getTeamCategoryByLeaderId(userId);

    const team = await getTeamById(hostTeamId, userId);
    if (!team) {
        // team 메뉴로 이동
    }

    await insertGame(hostTeamId, body, category);
    return;
};
