import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

class List extends Model {
	declare id: string;
	declare userId: string;
	declare name: string;
	declare favorite: boolean;
	declare readonly createdAt: Date;
	declare updatedAt: Date;
}

List.init(
	{
		id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'Users', key: 'id' }
		},
		name: { type: DataTypes.STRING, allowNull: false },
		favorite: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		sequelize,
		modelName: 'List',
		tableName: 'Lists',
		timestamps: false
	}
);

async function getName(id: string): Promise<string | null> {
	const list = await List.findByPk(id);
	return list ? list.name : "";
}

async function getIsFavorite(id: string): Promise<boolean> {
	const list = await List.findByPk(id);
	return list ? list.favorite : false;
}

async function getOwner(id: string): Promise<string | null> {
	const list = await List.findByPk(id);
	return list ? list.userId : "";
}

export { List, getName, getIsFavorite, getOwner };
