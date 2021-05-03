import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';

/**
 * Database provider
 *
 * contains database factory provider
 * we use TypeOrmModule here and add connection
 */
export const DatabaseProvider = TypeOrmModule.forRootAsync({
  useFactory: () => config,
});
