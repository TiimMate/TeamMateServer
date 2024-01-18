import { Status } from "./response.status";

export interface Response {
    isSuccess: boolean;
    code: number | string;
    message: string;
    result?: any;
}

export const response = ({ isSuccess, code, message }: Status, result?: any): Response => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result,
    };
};
