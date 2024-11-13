import { DataTypes, Model, Sequelize } from 'sequelize';

class User extends Model {
  public id!: string;
  public password!: string;
  public weChatId!: string;
  public username!: string;
  public role!: 'user' | 'admin' | 'guest';
  public createdAt!: Date;
  public updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        weChatId: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: true,
          validate: { is: /^\d{11}$/ }
        },
        role: {
          type: DataTypes.ENUM('user', 'admin', 'guest'),
          defaultValue: 'user'
        }

      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
      }
    )
  }
}

export { User };
