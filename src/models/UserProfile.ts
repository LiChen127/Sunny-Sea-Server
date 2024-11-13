import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './User.js';
class UserProfile extends Model {
  public id!: string;
  public nickname!: string;
  public userId!: string;
  public gender!: 'male' | 'female' | 'other';
  public birthDate!: Date;
  public occupation!: string;
  public region!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
  static initModel(sequelize: Sequelize) {

    UserProfile.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.CHAR(36),
          allowNull: false,
          references: {
            model: User,
            key: 'id',
          },
        },
        nickname: { type: DataTypes.STRING },
        gender: { type: DataTypes.ENUM('male', 'female', 'other') },
        birthDate: { type: DataTypes.DATE },
        occupation: { type: DataTypes.STRING },
        region: { type: DataTypes.STRING },

      },
      {
        sequelize,
        tableName: 'user_profiles',
        timestamps: true,
      }
    );
  }
}



export { UserProfile };
