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
