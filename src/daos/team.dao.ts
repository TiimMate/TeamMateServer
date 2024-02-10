import db from "../models";
import { defaultLevel } from "../constants/level.constant";
import { CreateTeamBody, UpdateTeamBodyWithoutMemberIdsToDelete } from "../schemas/team.schema";
import { Category } from "../types/category.enum";
import { Op } from "sequelize";

export const findTeamPreviewByCategory = async (userId: number, category: Category) => {
    const teamsAsLeader = await db.Team.findAll({
        raw: true,
        where: {
            category,
            leaderId: userId,
        },
        attributes: teamPreviewAttributes(),
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
        attributes: teamPreviewAttributes(),
    });
    const previews = [...teamsAsLeader, ...teamsAsMember].sort((a, b) => a.name.localeCompare(b.name));
    return previews;
};

const teamPreviewAttributes = () => {
    return ["id", "name", "logo"];
};

export const insertTeam = async (data: CreateTeamBody, userId: number, inviteCode: string) => {
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

export const getTeamDetail = async (teamId: number) => {
    return await db.Team.findAll({
        raw: true,
        where: {
            id: teamId,
        },
        include: [
            {
                model: db.Member,
                attributes: ["userId"],
                required: false,
            },
        ],
        attributes: ["name", "logo", "skillLevel", "mannerLevel", "description", "leaderId", "category"],
    });
};

export const getTeamDetailForGuesting = async (teamId: number) => {
    return await db.Team.findOne({
        raw: true,
        where: {
            id: teamId,
        },
        attributes: [
            "name",
            "description",
            "gender",
            "ageGroup",
            "gymName",
            "skillLevel",
            "mannerLevel",
            "leaderId",
            "category",
        ],
    });
};

export const getTeamIdByInviteCode = async (inviteCode: string): Promise<number> => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            inviteCode,
        },
        attributes: ["id"],
    });
    return team?.id;
};

export const getTeamByLeaderId = async (teamId: number, userId: number) => {
    return await db.Team.findOne({
        where: {
            id: teamId,
            leaderId: userId,
        },
    });
};

export const getTeamIdByLeaderId = async (userId: number) => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            leaderId: userId,
        },
        attributes: ["id"],
    });
    return team?.id;
};

export const getTeamIdsByLeaderId = async (userId: number) => {
    return await db.Team.findAll({
        raw: true,
        where: {
            leaderId: userId,
        },
        attributes: ["id"],
    });
};

export const getTeamCategoryByLeaderId = async (userId: number) => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            leaderId: userId,
        },
        attributes: ["category"],
    });
    return team?.category;
};

export const getTeamNameByTeamId = async (teamId: number) => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            id: teamId,
        },
        attributes: ["name"],
    });
    return team?.name;
};

export const setTeam = async (team, body: UpdateTeamBodyWithoutMemberIdsToDelete) => {
    Object.keys(body).forEach((field) => {
        team[field] = body[field];
    });
    await team.save();
};

export const findTeamPreviewByCategoryForLeader = async (userId: number, category: Category) => {
    return await db.Team.findAll({
        raw: true,
        where: {
            category,
            leaderId: userId,
        },
        attributes: ["name"],
    });
};

export const findLeaderId = async (hostingTeamId: number, opposingTeamId: number) => {
    return await db.Team.findAll({
        raw: true,
        where: {
            [Op.or]: [{ id: hostingTeamId }, { id: opposingTeamId }],
        },
        attributes: ["id", "leaderId"],
    });
};

export const getLeaderId = async (teamId: number) => {
    const team = await db.Team.findOne({
        raw: true,
        where: {
            id: teamId,
        },
        attributes: ["leaderId"],
    });
    return team.leaderId;
};
