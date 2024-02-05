export const convertToUTC = (date: string): string => {
    return new Date(
        new Date(date).toLocaleString("en-US", {
            timeZone: "Asia/Seoul",
        }),
    ).toISOString();
};

export const convertToKST = (date: Date | string): string => {
    return (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
};
