import db from "../models";
import { Op, Sequelize } from "sequelize";
import { CreateGameBody } from "../schemas/game.schema";
import { ApplyGameBody } from "../schemas/game-apply.schema";
import { getTeamIdByLeaderId } from "./team.dao";
import { MatchType } from "../types/match-type.enum";

export const findGamesByDate = async (date, category) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                },
            },
        ],
        attributes: ["id", "gameTime", "status"],
        order: [["created_at", "DESC"]],
    });
};

export const findGamesByGender = async (date, category, gender) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                    gender,
                },
            },
        ],
        attributes: ["id", "gameTime", "status"],
        order: [["created_at", "DESC"]],
    });
};

export const findGamesByLevel = async (date, category, skillLevel) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                    skillLevel,
                    // skillLevel: {
                    //     [Op.between]: [Math.floor(skillLevel / 10) * 10, Math.floor(skillLevel / 10) * 10 + 9],
                    // },
                },
            },
        ],
        attributes: ["id", "gameTime", "status"],
        order: [["created_at", "DESC"]],
    });
};

export const findGamesByRegion = async (date, category, region) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                    region,
                },
            },
        ],
        attributes: ["id", "gameTime", "status"],
        order: [["created_at", "DESC"]],
    });
};

export const getGameDetail = async (gameId) => {
    return await db.Game.findOne({
        raw: true,
        where: {
            id: gameId,
        },
        attributes: ["hostTeamId", "gameTime", "gameDuration", "description"],
    });
};

export const insertGame = async (hostTeamId, data: CreateGameBody, category) => {
    await db.Game.create({
        hostTeamId: hostTeamId,
        gameTime: data.gameTime,
        gameDuration: data.gameDuration,
        category: category,
        description: data.description,
    });
};

export const setGame = async (game, body) => {
    Object.keys(body).forEach((field) => {
        game[field] = body[field];
    });
    await game.save();
};

export const getGameByUserId = async (gameId, userId) => {
    const hostTeamId = await getTeamIdByLeaderId(userId);
    return await db.Game.findOne({
        where: {
            id: gameId,
            hostTeamId: hostTeamId,
        },
    });
};

export const insertGameApplication = async (gameId: number, body: ApplyGameBody) => {
    const teamId = body.teamId;

    await db.GameApply.create({
        gameId: gameId,
        teamId: teamId,
    });
};

export const getGame = async (gameId: number) => {
    return await db.Game.findOne({
        raw: true,
        where: {
            id: gameId,
        },
        attributes: ["hostTeamId", "opposingTeamId", "gameTime"],
    });
};

export const updateOpposingTeam = async (gameId: number, opposingTeamId: number) => {
    await db.Game.update({ opposingTeamId: opposingTeamId, status: 1 }, { where: { id: gameId } });
};

export const findGameByHostTeamsAndGameTime = async (teamIds: number[], gameTime) => {
    const hostTeamFilter = {
        hostTeamId: {
            [Op.in]: teamIds,
        },
    };
    return findGameByTeamsAndGameTime(hostTeamFilter, gameTime);
};

export const findGameByOpposingTeamsAndGameTime = async (teamIds: number[], gameTime) => {
    const opposingTeamFilter = {
        opposingTeamId: {
            [Op.in]: teamIds,
        },
    };
    return findGameByTeamsAndGameTime(opposingTeamFilter, gameTime);
};

const findGameByTeamsAndGameTime = async (teamFilter, gameTime: string) => {
    const gameResults = await db.Game.findAll({
        raw: true,
        where: {
            ...teamFilter,
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${gameTime}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["id", "gameTime"],
    });
    for (const gameResult of gameResults) {
        gameResult.type = MatchType.game;
    }
    return gameResults;
};
