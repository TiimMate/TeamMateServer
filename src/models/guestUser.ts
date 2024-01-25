import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class GuestUser extends Model<InferAttributes<GuestUser>, InferCreationAttributes<GuestUser>> {
    static initiate(sequelize: Sequelize) {
        GuestUser.init(
            {
                guestId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                userId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "GuestingUser",
                tableName: "guestingUser",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.Member.belongsTo(db.Guest, { foreignKey: "guest_id" });
        db.Member.belongsTo(db.User, { foreignKey: "user_id" });
    }
}

module.exports = GuestUser;
