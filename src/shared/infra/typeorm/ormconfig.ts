'reflect-metadata';
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import MainSeeder from "./seeds/MainSeeder";

const options = {
   type: "postgres",
   host: "database",
   port: Number(process.env.DATABASE_PORT),
   username: "portlouistest",
   password: "portlouistest123",
   database: "portlouisdb",
   synchronize: true,
   migrationsRun: false,
   migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
   seeds: [MainSeeder],
   entities: ["./src/modules/**/infra/persistence/entity/*.ts"],
   cli: {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
   }
} as DataSourceOptions & SeederOptions;
export const PostgresDataSource = new DataSource(options);

PostgresDataSource.initialize().then(() => {
   console.log('Postgres Data Source has been initialized!')


})
   .catch((err) => {
       console.error("Error during Postgres Data Source initialization", err)
   })



