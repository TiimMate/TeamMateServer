import { Op } from "sequelize";
import db from "../models";
import { Category } from "../types/category.enum";
import { userInfoAttributes } from "../daos/user.dao";

export const findMemberInfoByTeamId = async (teamId, userInfoAttributes) => {
    throw new Error("더 이상 사용하지 않는 함수");
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

export const findMemberInfoByCategory = async (teamId: number, category: Category) => {
    return await db.Member.findAll({
        raw: true,
        where: {
            teamId,
        },
        include: [
            {
                model: db.User,
                attributes: ["nickname", "height"],
                include: [
                    {
                        model: db.Profile,
                        where: {
                            category: category,
                        },
                        required: false,
                        attributes: ["position"],
                    },
                ],
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

export const insertMember = async (teamId: number, userId: number) => {
    await db.Member.create({
        teamId,
        userId,
    });
};

export const isMemberExist = async (teamId: number, userId: number) => {
    const member = await db.Member.findOne({
        where: {
            teamId,
            userId,
        },
    });
    return member !== null;
};

export const findMemberToDelete = async (memberIdsToDelete: number[], teamId: number) => {
    return await db.Member.findAll({
        where: {
            teamId,
            userId: {
                [Op.in]: memberIdsToDelete,
            },
        },
    });
};

export const deleteMembers = async (members) => {
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
