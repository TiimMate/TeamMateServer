// import { BaseError } from "../config/error";
// import { status } from "../config/response.status";
import { findGamesByDate, findGamesByGender, findGamesByLevel, findGamesByRegion } from "../daos/games.dao";
import { getMemberCountByTeamId } from "../daos/member.dao";
import { readGameResponseDTO } from "../dtos/games.dto";

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
