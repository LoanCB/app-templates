import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import SnakeNamingStrategy from 'typeorm-naming-strategy';
import configurationConfig from '../config/configuration.config';

const configService = new ConfigService(configurationConfig());

export const AppDataSource: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('database.host'),
  port: configService.get('database.port'),
  username: configService.get('database.username'),
  password: configService.get('database.password'),
  database: configService.get('database.name'),
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/**/*.{ts,js}'],
  synchronize: configService.get('node_env') === 'test',
  logging: configService.get('sql_logging'),
  namingStrategy: new SnakeNamingStrategy(),
};

export const dataSource = new DataSource(AppDataSource);
