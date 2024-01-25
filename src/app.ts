import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import passport from "passport";

import "./config/passport";
import db from "./models/index";
import { response } from "./config/response";
import { BaseError } from "./config/error";
import { status } from "./config/response.status";

import { authRouter } from "./routes/auth.route";
import { teamsRouter } from "./routes/teams.route";
import { membersRouter } from "./routes/members.route";
import { guestsRouter } from "./routes/guests.route";

const app = express();

app.set("port", process.env.PORT || 3000);
db.sequelize
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
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/teams", teamsRouter);
app.use("/members", membersRouter);
app.use("/guests", guestsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req: Request, res: Response, next: NextFunction) => {
    res.locals.message = err.message;
    res.locals.err = process.env.NODE_ENV !== "production" ? err : {};
    console.log(err);
    const error = err instanceof BaseError ? err : new BaseError(status.INTERNAL_SERVER_ERROR);
    res.status(error.data.status).send(response(error.data));
});

app.listen(app.get("port"), () => {
    console.log(`Example app listening on port ${app.get("port")}`);
});
