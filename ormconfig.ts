import 'reflect-metadata';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from './src/shared/infra/typeorm/seeds/MainSeeder';

const options = {
   "type": "postgres",
   "host": "database",
   "port": 5432,
   "username": "portlouistest",
   "password": "portlouistest123",
   "database": "portlouisdb",
   "synchronize": false,
   "migrationsRun": false,
   "logging": false,
   "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
   "seeds": [MainSeeder],
   "entities": ["./src/modules/**/infra/persistence/entity/*.ts"],
   "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
   }
} as DataSourceOptions & SeederOptions

export const PostgresDataSource: DataSource = new DataSource(options);




module.exports =
{
   PostgresDataSource
}





