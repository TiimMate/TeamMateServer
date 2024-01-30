import { Sequelize } from "sequelize";
import db from "../models";
import { getTeamIdByLeaderId } from "./team.dao";

const { Op } = require("sequelize");

export const findGuestsOfMatchingGuesting = async (userId, date) => {
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

    return guestResults;
};

// export const findGamesOfMatchingGuesting = async (userId, date) => {
//     const teamId = await getTeamIdByLeaderId(userId);
//     const gameApplyResults = await db.GameApply.findAll({
//         raw: true,
//         where: {
//             teamId: teamId,
//         },
//         attributes: ["game_id"],
//     });

//     const guestIds = gameApplyResults.map((gameApply) => gameApply.gameId);
//     const games = await db.Game.findAll({
//         raw: true,
//         where: {
//             opposing_team_id: {
//                 [Op.in]: guestIds,
//             },
//             [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
//         },
//         include: [
//             {
//                 model: db.Team,
//                 attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
//             },
//         ],
//         attributes: ["gameTime"],
//     });

//     return games;
// };

export const findGuestsOfMatchingHosting = async (userId, date) => {
    const teamId = await getTeamIdByLeaderId(userId);
    return await db.Guest.findAll({
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
};

export const findGamesOfMatchingHosting = async (userId, date) => {
    const teamId = await getTeamIdByLeaderId(userId);
    return await db.Game.findAll({
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
};
