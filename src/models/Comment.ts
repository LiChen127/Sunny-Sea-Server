import { DataTypes, Model, Sequelize } from "sequelize";

class Comment extends Model {
  public id!: string;
  public content!: string;
  public userId!: string;
  public postId!: string;
  public likes!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Comment.init({
      id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      userId: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      postId: {
        type: DataTypes.CHAR(36),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'comments',
      timestamps: true
    })
  }
}

export { Comment };