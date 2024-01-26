import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class CommunityBookmark extends Model<InferAttributes<CommunityBookmark>, InferCreationAttributes<CommunityBookmark>> {
    static initiate(sequelize: Sequelize) {
        CommunityBookmark.init(
            {
                postId: {
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
                modelName: "CommunityBookmark",
                tableName: "community_bookmark",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.CommunityBookmark.belongsTo(db.CommunityPost, { foreignKey: "post_id" });
        db.CommunityBookmark.belongsTo(db.User, { foreignKey: "user_id" });
    }
}

module.exports = CommunityBookmark;
