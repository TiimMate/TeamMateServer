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
    guestResults.type = "guest";

    return guestResults;
};

export const findGamesOfMatchingGuesting = async (team_id: number, date: string) => {
    const gameApplyResults = await db.sequelize.query("SELECT game_id FROM game_apply WHERE team_id = :team_id", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: { team_id: team_id },
    });

    const gameIds = gameApplyResults.map((gameApply) => gameApply.game_id);
    const gameResults = await db.Game.findAll({
        raw: true,
        where: {
            id: {
                [Op.in]: gameIds,
            },
            opposing_team_id: team_id,
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
    gameResults.type = "game";

    return gameResults;
};

export const findGuestsOfMatchingHosting = async (teamId: number, date: string) => {
    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            teamId: teamId,
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
    guestResults.type = "guest";

    return guestResults;
};

export const findGamesOfMatchingHosting = async (teamId: number, date: string) => {
    const gameResults = await db.Game.findAll({
        raw: true,
        where: {
            hostTeamId: teamId,
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
    gameResults.type = "game";

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
