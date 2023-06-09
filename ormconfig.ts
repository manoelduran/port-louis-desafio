import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";

const options = {
   "type": "postgres",
   "host": "database",
   "port": Number(process.env.DATABASE_PORT),
   "username": process.env.POSTGRES_USER,
   "password": process.env.POSTGRES_PASSWORD,
   "database": process.env.POSTGRES_DB,
   "synchronize": false,
   "migrationsRun": false,
   "logging": false,
   "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
   "entities": ["./src/modules/**/infra/persistence/entity/*.ts"],
   "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
   }
} as DataSourceOptions;

export const PostgresDataSource: DataSource = new DataSource(options);




module.exports =
{
   PostgresDataSource
}





