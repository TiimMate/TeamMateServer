import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class Guest extends Model<InferAttributes<Guest>, InferCreationAttributes<Guest>> {
    static initiate(sequelize: Sequelize) {
        Guest.init(
            {
                teamId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                category: {
                    type: new DataTypes.STRING(15),
                    allowNull: false,
                },
                game_time: {
                    type: new DataTypes.DATE(6),
                    allowNull: false,
                },
                description: {
                    type: new DataTypes.STRING(400),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Guest",
                tableName: "guest",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Team.hasMany(db.GuestingUser, { foreignKey: "guest_id" });
        db.Team.belongsTo(db.Team, { foreignKey: "team_id" });
    }
}

module.exports = Guest;
