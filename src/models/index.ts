import { Sequelize, Dialect } from "sequelize";
import { config } from "../../config/config";
import fs from "fs";
import path from "path";

const developmentConfig = config.development;
export const sequelize = new Sequelize(
    developmentConfig.database,
    developmentConfig.username,
    developmentConfig.password,
    {
        host: developmentConfig.host,
        dialect: developmentConfig.dialect as Dialect,
    },
);

interface Database {
    sequelize: Sequelize;
    [key: string]: any;
}
const db: Database = { sequelize };

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
    .filter((file) => file !== basename && file.slice(-3) === ".ts")
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        console.log(model.name);
        db[model.default.name] = model;
        model.initiate(sequelize);
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
