import { Sequelize } from "sequelize";
import db from "../models";

export const findGuesting = async (date, category) => {
    return await db.Guest.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                where: {
                    category,
                },
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime", "recruitCount"],
    });
};

export const findGuestingByGender = async (date, category, gender) => {
    return await db.Guest.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                where: {
                    category,
                    gender,
                },
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime", "recruitCount"],
    });
};

// export const findGuestingByLevel = async (date, category, skillLevel) => {
//     return await db.Guest.findAll({
//         raw: true,
//         where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
//         include: [
//             {
//                 model: db.Team,
//                 where: {
//                     category,
//                     skillLevel,
//                 },
//                 attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
//             },
//         ],
//         attributes: ["gameTime", "recruitCount"],
//     });
// };

export const findGuestingByRegion = async (date, category, region) => {
    return await db.Guest.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                where: {
                    category,
                    region,
                },
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime", "recruitCount"],
    });
};

// export const findGuestDetail = async (guestId) => {
//     return await db.Guest.findOne({
//         raw: true,
//         where: {
//             id: guestId,
//         },
//         include: [
//             {
//                 model: db.Team,
//                 as: "TeamInfo",
//                 attributes: ["name", "skill_level", "manner_level", "region", "description", "gender", "age_group"],
//                 where: {
//                     id: db.Sequelize.col("Guest.TeamId"),
//                 },
//             },
//             {
//                 model: db.User,
//                 as: "TeamMemberInfo",
//                 attributes: ["nickname"],
//                 where: {
//                     id: db.Sequelize.col("User.TeamId"),
//                 },
//             },
//         ],
//         attributes: ["game_time", "dscription"],
//     });
// };
