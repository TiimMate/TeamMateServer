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

// export const findGuestingByGender = async (selectedDate, category, gender) => {
//     const Guesting = await db.Guest.findAll({
//         raw: true,
//         where: {
//             gameTime: selectedDate,
//             category,
//             gender,
//         },
//         include: [
//             {
//                 model: db.Team,
//                 as: "TeamInfo",
//                 attributes: ["name", "region", "gender", "age_group", "skill_level"],
//                 where: {
//                     id: db.Sequelize.col("Guest.TeamId"),
//                 },
//             },
//         ],
//         attributes: ["game_time"],
//     });

//     return Guesting.map((guest) => guest["TeamInfo"]);
// };

// export const findGuestingByLevel = async (selectedDate, category, level) => {
//     const Guesting = await db.Guest.findAll({
//         raw: true,
//         where: {
//             gameTime: selectedDate,
//             category,
//             level,
//         },
//         include: [
//             {
//                 model: db.Team,
//                 as: "TeamInfo",
//                 attributes: ["name", "region", "gender", "age_group", "skill_level"],
//                 where: {
//                     id: db.Sequelize.col("Guest.TeamId"),
//                 },
//             },
//         ],
//         attributes: ["game_time"],
//     });

//     return Guesting.map((guest) => guest["TeamInfo"]);
// };

// export const findGuestingByRegion = async (selectedDate, category, region) => {
//     const Guesting = await db.Guest.findAll({
//         raw: true,
//         where: {
//             gameTime: selectedDate,
//             category,
//             region,
//         },
//         include: [
//             {
//                 model: db.Team,
//                 as: "TeamInfo",
//                 attributes: ["name", "region", "gender", "age_group", "skill_level"],
//                 where: {
//                     id: db.Sequelize.col("Guest.TeamId"),
//                 },
//             },
//         ],
//         attributes: ["game_time"],
//     });

//     return Guesting.map((guest) => guest["TeamInfo"]);
// };

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
