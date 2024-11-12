import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
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

export default User;
