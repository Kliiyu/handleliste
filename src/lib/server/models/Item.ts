import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class Item extends Model {
	declare id: string;
	declare listId: string;
	declare name: string;
	declare quantity: number;
	declare price: number;
	declare weight: number;
	declare checked: boolean;
	declare readonly createdAt: Date;
}

Item.init(
	{
		id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true, primaryKey: true },
		listId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: { model: 'Lists', key: 'id' }
		},
		name: { type: DataTypes.STRING, allowNull: false },
		quantity: { type: DataTypes.INTEGER, allowNull: false },
		price: { type: DataTypes.INTEGER, allowNull: false },
		weight: { type: DataTypes.INTEGER, allowNull: false },
		checked: { type: DataTypes.BOOLEAN, defaultValue: false },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		sequelize,
		modelName: 'Item',
		tableName: 'Items',
		timestamps: false
	}
);

export { Item };
