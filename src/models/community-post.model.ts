import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class CommunityPost extends Model<InferAttributes<CommunityPost>, InferCreationAttributes<CommunityPost>> {
    static initiate(sequelize: Sequelize) {
        CommunityPost.init(
            {
                title: {
                    type: new DataTypes.STRING(30),
                    allowNull: false,
                },
                content: {
                    type: new DataTypes.STRING(1000),
                    allowNull: true,
                },
                link: {
                    type: new DataTypes.STRING(200),
                    allowNull: true,
                },
                authorId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "CommunityPost",
                tableName: "community_post",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.CommunityPost.hasMany(db.CommunityImage, { foreignKey: "post_id" });
        db.CommunityPost.hasMany(db.CommunityComment, { foreignKey: "post_id" });
        db.CommunityPost.hasMany(db.CommunityBookmark, { foreignKey: "post_id" });
        db.CommunityPost.belongsTo(db.User, { foreignKey: "author_id" });
    }
}

module.exports = CommunityPost;
