import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD as string,
  {
    host: process.env.MYSQL_HOST as string,
    dialect: 'mysql',
    logging: false
  }
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL with Sequelize');

    await sequelize.sync({ force: false });
    console.log('✅ Synced all models with Sequelize')
    return sequelize;
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
  }
}

export { sequelize };
