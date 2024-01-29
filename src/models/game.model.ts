import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Game extends Model<InferAttributes<Game>, InferCreationAttributes<Game>> {
    static initiate(sequelize: Sequelize) {
        Game.init(
            {
                hostTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                applyTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
                },
                opposingTeamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: true,
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
                status: {
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
        db.Game.belongsTo(db.Team, { foreignKey: "host_team_id", as: "HostTeam" });
        db.Game.belongsTo(db.Team, { foreignKey: "opposing_team_id" });
        db.Game.belongsToMany(db.Team, {
            through: "game_apply",
        });
    }
}

module.exports = Game;
