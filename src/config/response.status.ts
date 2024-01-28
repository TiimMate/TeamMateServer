import { StatusCodes } from "http-status-codes";

export interface Status {
    status: number;
    isSuccess: boolean;
    code: number | string;
    message: string;
    detail?: any;
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
    REQUEST_VALIDATION_ERROR: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: "COMMON003",
        message: "요청이 유효하지 않습니다.",
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

    //team err
    NO_JOINABLE_TEAM: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "TEAM001",
        message: "해당 초대 코드로 가입할 수 있는 팀이 없습니다.",
    },
    TEAM_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "TEAM002",
        message: "요청한 팀을 찾을 수 없습니다.",
    },

    //member err
    ALREADY_JOINED: {
        status: StatusCodes.CONFLICT,
        isSuccess: false,
        code: "MEMBER001",
        message: "해당 팀에 이미 가입되어 있습니다.",
    },
    MEMBER_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "MEMBER002",
        message: "멤버를 찾을 수 없습니다.",
    },

    // guest error
    GUEST_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "GUESTER001",
        message: "게스팅을 찾을 수 없습니다.",
    },

    //post err
    POST_NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: "POST001",
        message: "요청한 글을 찾을 수 없습니다.",
    },
};
