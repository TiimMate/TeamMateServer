import { Sequelize, Op } from "sequelize";
import db from "../models";

export const findGuestsOfMatchingGuesting = async (userId: number, date: string) => {
    const guestUserResults = await db.GuestUser.findAll({
        raw: true,
        where: {
            userId: userId,
            status: 1,
        },
        attributes: ["guestId"],
    });

    const guestIds = guestUserResults.map((guestUser) => guestUser.guestId);

    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            id: {
                [Op.in]: guestIds,
            },
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime"],
    });
    for (const guestResult of guestResults) {
        guestResult.type = "guest";
    }

    return guestResults;
};

export const findGamesOfMatchingGuesting = async (teamIds, date: string) => {
    const gameResults = await db.Game.findAll({
        raw: true,
        where: {
            opposingTeamId: { [Op.in]: teamIds },
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime"],
    });
    for (const gameResult of gameResults) {
        gameResult.type = "game";
    }

    return gameResults;
};

export const findGuestsOfMatchingHosting = async (teamIds, date: string) => {
    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            teamId: { [Op.in]: teamIds },
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime"],
    });
    for (const guestResult of guestResults) {
        guestResult.type = "guest";
    }

    return guestResults;
};

export const findGamesOfMatchingHosting = async (teamIds, date: string) => {
    const gameResults = await db.Game.findAll({
        raw: true,
        where: {
            hostTeamId: { [Op.in]: teamIds },
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime"],
    });
    for (const gameResult of gameResults) {
        gameResult.type = "game";
    }

    return gameResults;
};

export const getTeamsAppliedById = async (gameId: number) => {
    return await db.GameApply.findAll({
        raw: true,
        where: { gameId: gameId },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "logo"],
            },
        ],
    });
};
