import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: (process.env.POSTGRES_PORT as unknown) as number,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
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
