import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class CommunityComment extends Model<InferAttributes<CommunityComment>, InferCreationAttributes<CommunityComment>> {
    static initiate(sequelize: Sequelize) {
        CommunityComment.init(
            {
                postId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                authorId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                content: {
                    type: new DataTypes.STRING(500),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "CommunityComment",
                tableName: "community_comment",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.CommunityComment.belongsTo(db.Post, { foreignKey: "post_id" });
        db.CommunityComment.belongsTo(db.User, { foreignKey: "author_id" });
    }
}

module.exports = CommunityComment;
