import { Op } from "sequelize";
import db from "../models";

export const findMemberInfoByTeamId = async (teamId, userInfoAttributes) => {
    return await db.Member.findAll({
        raw: true,
        where: {
            teamId,
        },
        include: [
            {
                model: db.User,
                attributes: userInfoAttributes(),
            },
        ],
        attributes: [],
    });
};

export const findMemberInfoWithoutLeaderByTeamId = async (teamId, userInfoAttributes) => {
    const team = await db.Team.findByPk(teamId);
    if (!team) {
        throw new Error("Team not found");
    }
    const leaderId = team.leaderId;

    // 리더 제외한 멤버들 조회
    return await db.Member.findAll({
        raw: true,
        where: {
            teamId: teamId,
            userId: {
                [Op.ne]: leaderId,
            },
        },
        include: [
            {
                model: db.User,
                attributes: userInfoAttributes(),
            },
        ],
        attributes: [],
    });
};

export const insertMember = async (teamId, userId) => {
    await db.Member.create({
        teamId,
        userId,
    });
};

export const isMemberExist = async (teamId, userId) => {
    const member = await db.Member.findOne({
        where: {
            teamId,
            userId,
        },
    });
    return member !== null;
};

export const findMemberToDelete = async (memberIdsToDelete, teamId) => {
    return await db.Member.findAll({
        where: {
            teamId,
            userId: {
                [Op.in]: memberIdsToDelete,
            },
        },
    });
};

export const deleteMembersById = async (members, teamId) => {
    for (const member of members) {
        await member.destroy();
    }
};

export const getMemberCountByTeamId = async (teamId) => {
    const count = await db.Member.count({
        where: {
            teamId,
        },
    });
    return count;
};
