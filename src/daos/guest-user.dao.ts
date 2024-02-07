import db from "../models";

export const InsertGuestUser = async (guestingId: number, userId: number) => {
    await db.GuestUser.create({
        guestId: guestingId,
        userId: userId,
        status: 0,
    });
};

export const getApplyGuestingUser = async (guestingId: number) => {
    return await db.GuestUser.findAll({
        raw: true,
        where: {
            guestId: guestingId,
        },
        include: [
            {
                model: db.User,
                attributes: ["nickname", "height"],
            },
        ],
        attributes: ["status"],
    });
};

export const getGuestUserById = async (guestUserId: number) => {
    return await db.GuestUser.findOne({
        where: {
            id: guestUserId,
        },
    });
};

export const setGuestUserStatus = async (guestUser) => {
    guestUser.status = 1;
    await guestUser.save();
};

export const checkForDuplicateGuestUser = async (userId, guestId) => {
    return await db.GuestUser.findOne({
        raw: true,
        where: {
            userId,
            guestId,
        },
    });
};
