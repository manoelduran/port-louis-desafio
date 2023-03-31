import { DataSource, DataSourceOptions } from "typeorm";
import 'reflect-metadata';
import '@shared/container';
export const PostgresDataSource = new DataSource({
   "type": "postgres",
   "host": "database",
   "port": 5432,
   "username": "portlouistest",
   "password": "portlouistest123",
   "database": "portlouisdb",
   "synchronize": true,
   "migrationsRun": false,
   "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
   "entities": ["./src/modules/**/infra/persistence/entity/*.ts"],
   "cli": {
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
      }
} as DataSourceOptions);

PostgresDataSource.initialize().then(() => {
   console.log('Postgres Data Source has been initialized!')

})
   .catch((err) => {
       console.error("Error during Postgres Data Source initialization", err)
   })

