import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    static initiate(sequelize: Sequelize) {
        Game.init(
            {
                hostTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                battleTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                approved: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Game",
                tableName: "game",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Game.hasMany(db.Team, { foreignKey: "host_team_id" });
        db.Game.hasMany(db.Team, { foreignKey: "battle_team_id" });
    }
}

module.exports = Game;
