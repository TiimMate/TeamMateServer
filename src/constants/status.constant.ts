type Status = {
    name: string;
};

const Statuss: { [key: number]: Status } = {
    0: { name: "모집 중" },
    1: { name: "모집 완료" },
};

export const defaultStatus = 0;

export const getStatusById = (id: number): string | undefined => {
    return Statuss[id].name;
};
