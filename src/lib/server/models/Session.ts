import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class Session extends Model {
	declare sessionId: string;
	declare userId: number;
	declare readonly createdAt: Date;
}

Session.init(
	{
		sessionId: { type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true },
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			references: { model: 'Users', key: 'id' }
		},
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		sequelize,
		modelName: 'Session',
		tableName: 'Sessions',
		timestamps: false
	}
);

export { Session };
