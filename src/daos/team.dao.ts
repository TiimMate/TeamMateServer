import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { defaultLevel } from "../constants/level.constant";
import db from "../models";
import { CreateTeamSchema } from "../schemas/team.schema";

export const findTeamPreviewByCategory = async (userId, category) => {
    const teamsAsLeader = await db.Team.findAll({
        raw: true,
        where: {
            category,
            leaderId: userId,
        },
        attributes: ["name", "logo"],
    });
    const teamsAsMember = await db.Team.findAll({
        raw: true,
        where: {
            category,
        },
        include: [
            {
                model: db.Member,
                where: {
                    userId,
                },
                attributes: [],
            },
        ],
        attributes: ["name", "logo"],
    });
    const previews = [...teamsAsLeader, ...teamsAsMember].sort((a, b) => a.name.localeCompare(b.name));
    return previews;
};

export const insertTeam = async (data: CreateTeamSchema, userId: number, inviteCode: string) => {
    await db.Team.create({
        logo: data.logo,
        name: data.name,
        description: data.description,
        gender: data.gender,
        ageGroup: data.ageGroup,
        region: data.region,
        gymName: data.gymName,
        leaderId: userId,
        inviteCode,
        skillLevel: defaultLevel,
        mannerLevel: defaultLevel,
        category: data.category,
    });
};

export const getTeamDetail = async (teamId) => {
    return await db.Team.findOne({
        raw: true,
        where: {
            id: teamId,
        },
        attributes: ["name", "logo", "skillLevel", "mannerLevel", "description", "leaderId"],
    });
};

export const getTeamDetailforGuesting = async (teamId) => {
    return await db.Team.findOne({
        raw: true,
        where: {
            id: teamId,
        },
        attributes: ["name", "description", "gender", "ageGroup", "gymName", "skillLevel", "mannerLevel", "leaderId"],
    });
};

export const getTeamIdByInviteCode = async (inviteCode): Promise<number> => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            inviteCode,
        },
        attributes: ["id"],
    });
    return team?.id;
};

export const getTeamById = async (teamId, userId) => {
    return await db.Team.findOne({
        where: {
            id: teamId,
            leaderId: userId,
        },
    });
};

export const getTeamIdByLeaderId = async (userId) => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            leaderId: userId,
        },
        attributes: ["id"],
    });

    return team?.id;
};

export const setTeam = async (team, body) => {
    Object.keys(body).forEach((field) => {
        team[field] = body[field];
    });
    await team.save();
};
