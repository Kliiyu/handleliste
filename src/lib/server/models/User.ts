import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class User extends Model {
	declare id: string;
	declare username: string;
	declare email: string;
	declare passwordHash: string;
	declare readonly createdAt: Date;
}

User.init(
	{
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		username: { type: DataTypes.STRING, allowNull: false, unique: true },
		email: { type: DataTypes.STRING, allowNull: false, unique: true },
		passwordHash: { type: DataTypes.STRING, allowNull: false },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		sequelize,
		modelName: 'User',
		timestamps: false
	}
);

export { User };
