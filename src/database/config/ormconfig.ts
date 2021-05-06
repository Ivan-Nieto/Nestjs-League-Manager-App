import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'apiuser',
  password: 'dbuser123',
  database: 'league',
  entities: [__dirname + '/../../**/*.entity.{ts,js}'],
  subscribers: [__dirname + '/../**/*.subscriber.{ts,js}'],
  migrations: [__dirname + '/../migrations/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  dropSchema: false,
};

export default config;
