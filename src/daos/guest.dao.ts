import { Sequelize } from "sequelize";
import db from "../models";
import { CreateGuestingSchema } from "../schemas/guest.schema";
import { getTeamIdByLeaderId } from "./team.dao";

export const insertGuesting = async (teamId, data: CreateGuestingSchema) => {
    await db.Guest.create({
        teamId: teamId,
        gameTime: data.gameTime,
        description: data.description,
        recruitCount: data.recruitCount,
    });
};

export const setGuesting = async (guesting, body) => {
    Object.keys(body).forEach((field) => {
        guesting[field] = body[field];
    });
    await guesting.save();
};

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

export const findGuestingByLevel = async (date, category, skillLevel) => {
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

export const getDetailedGuesting = async (guestingId) => {
    return await db.Guest.findOne({
        raw: true,
        where: {
            id: guestingId,
        },
        attributes: ["teamId", "gameTime", "description", "recruitCount"],
    });
};

export const InsertGuestUser = async (guestingId, userId) => {
    await db.GuestUser.create({
        guestId: guestingId,
        userId: userId,
        status: 0,
    });
};

export const getGuestingById = async (guestingId, userId) => {
    const teamId = await getTeamIdByLeaderId(userId);
    return await db.Guest.findOne({
        where: {
            id: guestingId,
            teamId: teamId,
        },
    });
};
