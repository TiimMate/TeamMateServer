import { Sequelize } from "sequelize";
import db from "../models";
import { getTeamIdByLeaderId, getTeamNameByTeamId } from "./team.dao";
import { getMemberCountByTeamId } from "./member.dao";

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

export const getHostingApplicantsTeamList = async (gameId: number) => {
    const selectQuery = "SELECT team_id FROM game_apply WHERE game_id = :gameId;";

    const teamIdsResult = await db.sequelize.query(selectQuery, {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: { gameId: gameId },
    });

    const teamsWithNames = await Promise.all(
        teamIdsResult.map(async (team) => {
            const name = await getTeamNameByTeamId(team.team_id);
            const memberCount = await getMemberCountByTeamId(team.team_id);
            return {
                team_id: team.team_id,
                name: name,
                memberCount: memberCount,
            };
        }),
    );

    return teamsWithNames;
};
