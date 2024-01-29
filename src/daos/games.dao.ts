import db from "../models";
import { Sequelize } from "sequelize";
import { getStatusById } from "../constants/status.constant";
import { CreateGameSchema } from "../schemas/game.schema";

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

export const insertGame = async (hostTeamId, data: CreateGameSchema, category) => {
    await db.Game.create({
        hostTeamId: hostTeamId,
        gameTime: data.gameTime,
        category: category,
        description: data.description,
    });
};
