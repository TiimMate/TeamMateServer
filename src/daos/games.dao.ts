import db from "../models";

export const findGamesByDate = async (selectedDate, category) => {
    const hostingGames = await db.Game.findAll({
        raw: true,
        where: {
            category,
            gameTime: selectedDate,
        },
        include: [
            {
                model: db.Team,
                as: "hostTeamInfo",
                attributes: ["name", "region", "gender", "age_group", "skill_level"],
                where: {
                    id: db.Sequelize.col("Game.hostTeamId"),
                },
            },
        ],
        attributes: [],
    });

    return hostingGames.map((game) => game["hostTeamInfo"]);
};

export const findGamesByGender = async (selectedDate, category, gender) => {
    const hostingGames = await db.Game.findAll({
        raw: true,
        where: {
            gameTime: selectedDate,
            category,
            gender,
        },
        include: [
            {
                model: db.Team,
                as: "hostTeamInfo",
                attributes: ["name", "region", "gender", "age_group", "skill_level"],
                where: {
                    id: db.Sequelize.col("Game.hostTeamId"),
                },
            },
        ],
        attributes: [],
    });

    return hostingGames.map((game) => game["hostTeamInfo"]);
};

export const findGamesByLevel = async (selectedDate, category, level) => {
    const hostingGames = await db.Game.findAll({
        raw: true,
        where: {
            gameTime: selectedDate,
            category,
            level,
        },
        include: [
            {
                model: db.Team,
                as: "hostTeamInfo",
                attributes: ["name", "region", "gender", "age_group", "skill_level"],
                where: {
                    id: db.Sequelize.col("Game.hostTeamId"),
                },
            },
        ],
        attributes: [],
    });

    return hostingGames.map((game) => game["hostTeamInfo"]);
};

export const findGamesByRegion = async (selectedDate, category, region) => {
    const hostingGames = await db.Game.findAll({
        raw: true,
        where: {
            gameTime: selectedDate,
            category,
            region,
        },
        include: [
            {
                model: db.Team,
                as: "hostTeamInfo",
                attributes: ["name", "region", "gender", "age_group", "skill_level"],
                where: {
                    id: db.Sequelize.col("Game.hostTeamId"),
                },
            },
        ],
        attributes: [],
    });

    return hostingGames.map((game) => game["hostTeamInfo"]);
};
