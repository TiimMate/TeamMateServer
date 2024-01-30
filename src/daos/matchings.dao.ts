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

// export const findGuestsOfMatchingHosting = async (userId, date) => {
//     const guestResults = await db.Guest.findAll({
//         raw: true,
//         where: {
//             teamId: getTeamIdByLeaderId(userId),
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

//     return guestResults;
// };

// export const findGamesOfMatchingGuesting = async (userId, date) => {
//     const guestUserResults = await db.game.findAll({
//         raw: true,
//         where: {
//             userId: userId,
//         },
//         attributes: ["guestId"],
//     });

//     const guestIds = guestUserResults.map((guestUser) => guestUser.guestId);
//     const games = await db.Game.findAll({
//         raw: true,
//         where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
//         include: [
//             {
//                 model: db.Team,
//                 as: "HostTeam",
//                 attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
//             },
//         ],
//         attributes: ["gameTime", "status"],
//         order: [["created_at", "DESC"]],
//     });
