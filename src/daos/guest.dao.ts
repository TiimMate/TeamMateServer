import db from "../models";
import { CreateGuestingBody, UpdateGuestingBody } from "../schemas/guest.schema";
import { Op, Sequelize } from "sequelize";
import { getTeamIdByLeaderId } from "./team.dao";
import { Category } from "../types/category.enum";
import { Gender } from "../types/gender.enum";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";
import { calculateHasNext, generateCursorCondition } from "../utils/paging.util";

const defaultLimit = 20;

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

export const findGuestAll = (date: string, category: Category, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuestByGender = (date: string, category: Category, gender: Gender, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { gender, category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuestByLevel = (date: string, category: Category, level: number, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { skillLevel: level, category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuestByRegion = (date: string, category: Category, region: string, cursorId: number | undefined) => {
    const guestsBeforeCursor = generateCursorCondition(cursorId);
    const TeamFilter = { region, category };
    return findGuests(date, guestsBeforeCursor, TeamFilter);
};

export const findGuests = async (date: string, guestFilter: object, TeamFilter: object) => {
    const guests = await db.Guest.findAll({
        raw: true,
        where: {
            ...guestFilter,
            [Op.and]: Sequelize.literal(`DATE_FORMAT(game_time, '%Y-%m-%d') = DATE_FORMAT('${date}', '%Y-%m-%d')`),
        },
        order: [["gameTime", "DESC"]],
        limit: defaultLimit,
        include: [
            {
                model: db.Team,
                where: TeamFilter,
                attributes: ["id", "name", "region", "gender", "ageGroup", "skillLevel"],
            },
        ],
        attributes: ["gameTime", "recruitCount"],
    });
    return { guests, hasNext: calculateHasNext(guests, defaultLimit) };
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
