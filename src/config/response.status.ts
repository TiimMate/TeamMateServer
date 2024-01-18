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
    NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "COMMON001",
        message: "요청한 페이지를 찾을 수 없습니다. 관리자에게 문의 바랍니다.",
    },
    MISSING_REQUIRED_FIELDS: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "COMMON002",
        message: "요청에 필요한 정보가 누락되었습니다.",
    },

    //auth err
    MISSING_ACCESS_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH001",
        message: "Access Token이 없습니다.",
    },
    ACCESS_TOKEN_EXPIRED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH002",
        message: "Access Token이 만료되었습니다.",
    },
    ACCESS_TOKEN_NOT_EXPIRED: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "AUTH003",
        message: "Access Token이 아직 만료되지 않았습니다.",
    },
    ACCESS_TOKEN_VERIFICATION_FAILED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH004",
        message: "Access Token 검증에 실패했습니다.",
    },
    MISSING_REFRESH_TOKEN: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH005",
        message: "Refresh Token이 없습니다.",
    },
    REFRESH_TOKEN_VERIFICATION_FAILED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: "AUTH006",
        message: "Refresh Token 검증에 실패했습니다. 다시 로그인해 주세요.",
    },
};
