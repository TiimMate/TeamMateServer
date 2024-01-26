import { Model, InferAttributes, InferCreationAttributes, DataTypes, Sequelize } from "sequelize";

class CommunityImage extends Model<InferAttributes<CommunityImage>, InferCreationAttributes<CommunityImage>> {
    static initiate(sequelize: Sequelize) {
        CommunityImage.init(
            {
                postId: {
                    type: new DataTypes.INTEGER(),
                    allowNull: false,
                },
                url: {
                    type: new DataTypes.STRING(1000),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: true,
                modelName: "CommunityImage",
                tableName: "community_image",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            },
        );
    }
    static associate(db) {
        db.CommunityImage.belongsTo(db.CommunityPost, { foreignKey: "post_id" });
    }
}

module.exports = CommunityImage;
