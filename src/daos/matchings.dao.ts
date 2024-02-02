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

export const findGamesOfMatchingGuesting = async (userId, date) => {
    const team_id = await getTeamIdByLeaderId(userId);
    const gameApplyResults = await db.sequelize.query("SELECT game_id FROM game_apply WHERE team_id = :team_id", {
        type: db.sequelize.QueryTypes.SELECT,
        replacements: { team_id: team_id },
    });

    const gameIds = gameApplyResults.map((gameApply) => gameApply.game_id);
    const games = await db.Game.findAll({
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

    return games;
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

export const getApplyGuestingUser = async (guestingId) => {
    return await db.GuestUser.findAll({
        raw: true,
        where: {
            guestId: guestingId,
        },
        include: [
            {
                model: db.User,
                attributes: ["nickname", "height"],
            },
        ],
        attributes: ["status"],
    });
};

export const setGuestStatus = async (guestUser) => {
    guestUser["status"] = 1;
    await guestUser.save();
};

export const getGuestUserById = async (guestUserId) => {
    return await db.GuestUser.findOne({
        where: {
            id: guestUserId,
        },
    });
};

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
