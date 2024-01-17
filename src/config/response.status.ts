import { StatusCodes } from "http-status-codes";

export interface Status {
    status: number;
    isSuccess: boolean;
    code: number | string;
    message: string;
}

export const status: { [key: string]: Status } = {
    //success
    SUCCESS: { status: StatusCodes.OK, isSuccess: true, code: 2000, message: "success!" },

    //error
    //common err
    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        isSuccess: false,
        code: "COMMON000",
        message: "서버 에러, 관리자에게 문의 바랍니다.",
    },
};
