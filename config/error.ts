import { Status } from "./response.status";

export class BaseError extends Error {
    public data: Status;

    constructor(data: Status) {
        super(data.message);
        this.data = data;
    }
}
