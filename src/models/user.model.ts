import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    static initiate(sequelize: Sequelize) {
        User.init(
            {
                nickname: {
                    type: new DataTypes.STRING(10),
                    allowNull: false,
                },
                provider: {
                    type: new DataTypes.STRING(10),
                    allowNull: false,
                },
                providerId: {
                    type: new DataTypes.STRING(50),
                    allowNull: false,
                },
                email: {
                    type: new DataTypes.STRING(50),
                    allowNull: false,
                    validate: {
                        isEmail: true,
                    },
                },
                refreshToken: {
                    type: new DataTypes.STRING(150),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "User",
                tableName: "users",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {}
}

module.exports = User;
