import db from "../models";

// const User = require("../models/user.model");
// import { v4 as uuidv4 } from "uuid";
// import { CreateTeamInput } from "../schemas/team.schema";
// import { User } from "../models/user.model";

// import { Team, User } from "../models";

export const getTeamPreviewByCategory = async (userId, category) => {
    const teamsAsLeader = await db.Team.findAll({
        raw: true,
        where: {
            category,
            leaderId: userId,
        },
        attributes: ["name", "logo"],
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
        attributes: ["name", "logo"],
    });
    const previews = [...teamsAsLeader, ...teamsAsMember].sort((a, b) => a.name.localeCompare(b.name));
    return previews;
};

// export const insertTeam = async (logo: string, data, userId, inviteCode) => {
//     return await db.Team.create({
//         logo,
//         name: data.name,
//         description: data.description,
//         gender: data.gender,
//         ageGroup: data.ageGroup,
//         region: data.region,
//         gymName: data.gymName,
//         leaderId: userId,
//         inviteCode: uuidv4(),
//         skillLevel: 1,
//         mannerLevel: 1,
//     });
// };

// export const insertTeam = async (data: CreateTeamInput) => {
//     return await db.Team.create({
//         ...data,
//         logo: "logo test",
//         gender: 1,
//         ageGroup: 1,
//         region: "region test",
//         gymName: "gym name test",
//         leaderId: 1,
//         inviteCode: uuidv4(),
//         skillLevel: 1,
//         mannerLevel: 1,
//     });
// };
