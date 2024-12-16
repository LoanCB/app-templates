import { config } from 'dotenv';
import * as process from 'process';

if (process.env.NODE_ENV === 'test') {
  config({ path: `${process.cwd()}/src/config/env/.env-test` });
} else {
  config({ path: `${process.cwd()}/.env` });
}

export default () => ({
  node_env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3100'),
  secret: process.env.APP_SECRET,
  jwtTime: process.env.JWT_EXPIRES_TIME || '60',
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    name: process.env.POSTGRES_DB,
  },
  defaultPaginationLimit: process.env.DEFAULT_PAGINATION_LIMIT || 15,
  sql_logging: !(process.env.SQL_LOGGING === 'false'),
});
