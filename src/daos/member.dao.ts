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

export const getMemberCountByTeamId = async (teamId) => {
    const count = await db.Member.count({
        where: {
            teamId,
        },
    });
    console.log(count);
    return count;
};
