import db from "../models";
import { Sequelize } from "sequelize";

export const findGamesByDate = async (date, category) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                },
            },
        ],
        attributes: ["gameTime"],
    });
};

export const findGamesByGender = async (date, category, gender) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                    gender,
                },
            },
        ],
        attributes: ["gameTime"],
    });
};

export const findGamesByLevel = async (date, category, skillLevel) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                    skillLevel,
                },
            },
        ],
        attributes: ["gameTime"],
    });
};

export const findGamesByRegion = async (date, category, region) => {
    return await db.Game.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                as: "HostTeam",
                attributes: ["name", "region", "gender", "ageGroup", "skillLevel"],
                where: {
                    category,
                    region,
                },
            },
        ],
        attributes: ["gameTime"],
    });
};
