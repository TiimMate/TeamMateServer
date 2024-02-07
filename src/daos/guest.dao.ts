import db from "../models";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { Sequelize } from "sequelize";
import { getTeamIdByLeaderId } from "./team.dao";
import { Category } from "../types/category.enum";
import { Gender } from "../types/gender.enum";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";

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

export const InsertGuestUser = async (guestingId: number, userId: number) => {
    await db.GuestUser.create({
        guestId: guestingId,
        userId: userId,
        status: 0,
    });
};

export const getGuestingById = async (guestingId: number, userId: number) => {
    const teamId = await getTeamIdByLeaderId(userId);
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
