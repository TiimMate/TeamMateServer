import db from "../models";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { Op, Sequelize } from "sequelize";
import { getTeamIdByLeaderId } from "./team.dao";
import { Category } from "../types/category.enum";
import { Gender } from "../types/gender.enum";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { MatchType } from "../types/match-type.enum";

export const insertGuesting = async (teamId: number, data: CreateGuestingBody) => {
    await db.Guest.create({
        teamId: teamId,
        gameTime: data.gameTime,
        description: data.description,
        recruitCount: data.recruitCount,
    });
};

export const setGuesting = async (guesting, body: UpdateGuestingBody) => {
    Object.keys(body).forEach((field) => {
        guesting[field] = body[field];
    });
    await guesting.save();
};

export const findGuesting = async (date: string, category: Category) => {
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

export const findGuestingByGender = async (date: string, category: Category, gender: Gender) => {
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

export const findGuestingByLevel = async (date: string, category: Category, skillLevel: number) => {
    return await db.Guest.findAll({
        raw: true,
        where: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        include: [
            {
                model: db.Team,
                where: {
                    category,
                    skillLevel,
                },
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime", "recruitCount"],
    });
};

export const findGuestingByRegion = async (date: string, category: Category, region: number) => {
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

export const getDetailedGuesting = async (guestingId: number) => {
    return await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        attributes: ["teamId", "gameTime", "description", "recruitCount"],
    });
};

export const getTeamByGuestingId = async (guestingId: number, userId: number) => {
    return await db.Guest.findOne({
        where: {
            id: guestingId,
        },
        include: {
            model: db.Team,
            where: {
                leaderId: userId,
            },
            attributes: [],
        },
        attributes: ["teamId"],
    });
};

export const getGuestingById = async (guestingId: number, teamId: number) => {
    return await db.Guest.findOne({
        where: {
            id: guestingId,
            teamId: teamId,
        },
    });
};

export const getGuestingByAcceptedUserId = async (guestingId: number, userId: number) => {
    return await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        include: [
            {
                model: db.GuestUser,
                where: {
                    userId,
                    status: 1,
                },
                attributes: [],
            },
        ],
        attributes: ["teamId", "gameTime"],
    });
};

export const getCategoryThroughTeamJoin = async (guestingId: number) => {
    const guest = await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        include: [
            {
                model: db.Team,
                attributes: ["category"],
            },
        ],
        attributes: [],
    });
    if (!guest) {
        throw new BaseError(status.GUEST_NOT_FOUND);
    }
    return guest["Team.category"];
};

export const findGuestingByTeamsAndGameTime = async (teamIds: number[], gameTime: string) => {
    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            teamId: {
                [Op.in]: teamIds,
            },
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${gameTime}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["id", "gameTime"],
    });
    for (const guestResult of guestResults) {
        guestResult.type = MatchType.guest;
    }
    return guestResults;
};

export const findGuestingByUserAndGameTime = async (userId: number, date: string) => {
    const guestResults = await db.Guest.findAll({
        raw: true,
        where: {
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        include: [
            {
                model: db.Team,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
            {
                model: db.GuestUser,
                where: {
                    userId,
                    status: 1,
                },
                attributes: [],
            },
        ],
        attributes: ["id", "gameTime"],
    });
    for (const guestResult of guestResults) {
        guestResult.type = MatchType.guest;
    }
    return guestResults;
};
