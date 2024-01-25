import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    static initiate(sequelize: Sequelize) {
        Game.init(
            {
                hostTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                guestTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                gameTime: {
                    type: new DataTypes.DATE(),
                    allowNull: false,
                },
                category: {
                    type: new DataTypes.STRING(15),
                    allowNull: false,
                },
                description: {
                    type: new DataTypes.STRING(400),
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
        // db.Game.hasMany(db.Team, { foreignKey: "host_team_id" });
        // db.Game.hasMany(db.Team, { foreignKey: "battle_team_id" });
        // db.Game.belongsTo(db.Team, {
        //     foreignKey: "category",
        //     targetKey: "category",
        // });
    }
}

module.exports = Game;