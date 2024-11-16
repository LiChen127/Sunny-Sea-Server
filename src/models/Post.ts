import { DataTypes, Model, Sequelize } from "sequelize";

class Post extends Model {
  public id!: string;
  public userId!: string;
  public postId!: string;
  public content!: string;
  public title!: string;
  public tag!: string;
  public likes!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Post.init({
      id: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      postId: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      userId: {
        type: DataTypes.CHAR(36),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      }
    }, {
      sequelize,
      tableName: 'posts',
      timestamps: true
    })
  }
}

export { Post };