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
