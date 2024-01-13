import { Sequelize, Dialect } from "sequelize";
import fs from "fs";
import path from "path";
import { config as Config } from "../config/config";

const env = process.env.NODE_ENV || "development";
const config = Config[env];
const db: any = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect as Dialect,
});

db.sequelize = sequelize;

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
    .filter((file) => {
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts";
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        db[model.name] = model;
        model.initiate(sequelize);
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;
