import db from "../models";
import { Sequelize } from "sequelize";
import { getStatusById } from "../constants/status.constant";
import { CreateGameBody } from "../schemas/game.schema";
import { ApplyGameBody } from "../schemas/game-apply.schema";
import { getTeamIdByLeaderId, getTeamByTeamId } from "../daos/team.dao";

export const findGamesByDate = async (date, category) => {
    const games = await db.Game.findAll({
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
        attributes: ["gameTime", "status"],
        order: [["created_at", "DESC"]],
    });

    return games.map((game) => ({
        ...game,
        status: getStatusById(game.status),
    }));
};

export const findGamesByGender = async (date, category, gender) => {
    const games = await db.Game.findAll({
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
        attributes: ["gameTime", "status"],
        order: [["created_at", "DESC"]],
    });

    return games.map((game) => ({
        ...game,
        status: getStatusById(game.status),
    }));
};

export const findGamesByLevel = async (date, category, skillLevel) => {
    const games = await db.Game.findAll({
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
                },
            },
        ],
        attributes: ["gameTime", "status"],
        order: [["created_at", "DESC"]],
    });

    return games.map((game) => ({
        ...game,
        status: getStatusById(game.status),
    }));
};

export const findGamesByRegion = async (date, category, region) => {
    const games = await db.Game.findAll({
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
        attributes: ["gameTime", "status"],
        order: [["created_at", "DESC"]],
    });

    return games.map((game) => ({
        ...game,
        status: getStatusById(game.status),
    }));
};

export const getGameDetail = async (gameId) => {
    return await db.Game.findOne({
        raw: true,
        where: {
            id: gameId,
        },
        attributes: ["hostTeamId", "gameTime", "description"],
    });
};

export const insertGame = async (hostTeamId, data: CreateGameBody, category) => {
    await db.Game.create({
        hostTeamId: hostTeamId,
        gameTime: data.gameTime,
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

export const getGameById = async (gameId, userId) => {
    const hostTeamId = await getTeamIdByLeaderId(userId);
    return await db.Game.findOne({
        where: {
            id: gameId,
            hostTeamId: hostTeamId,
        },
    });
};

export const insertGameApplication = async (gameId: number, body: ApplyGameBody) => {
    const teamId = body.teamId; // ApplyGameBody 내의 teamId를 추출

    const insertQuery =
        "INSERT INTO game_apply (game_id, team_id, created_at, updated_at) VALUES (:gameId, :teamId, NOW(), NOW())";

    await db.sequelize.query(insertQuery, {
        replacements: { gameId: gameId, teamId: teamId },
        type: db.sequelize.QueryTypes.INSERT,
    });
};
