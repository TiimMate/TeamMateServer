import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";

import { sequelize } from "./models/index";
import { response } from "../config/response";
import { BaseError } from "../config/error";
import { status } from "../config/response.status";

// import { usersRouter } from "./routes/users.route";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use("/users", usersRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err: BaseError, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.err = process.env.NODE_ENV !== "production" ? err : {};
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR.status).send(response(err.data));
});

app.listen(app.get("port"), () => {
    console.log(`Example app listening on port ${app.get("port")}`);
});
