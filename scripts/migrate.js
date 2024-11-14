import sequelize from '../src/config/database.ts';
import { Umzug, SequelizeStorage } from 'umzug';

const umzug = new Umzug({
  migrations: {
    glob: ['../src/migrations/*.ts'],
  },
  storage: new SequelizeStorage({ sequelize }), // 传递已配置好的 sequelize 实例
  context: sequelize.getQueryInterface(),
  logger: console,
});

async function runMigrations() {
  try {
    console.log('Running migrations...');
    await umzug.up(); // 执行迁移
    console.log('Migrations completed');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
}

runMigrations();
