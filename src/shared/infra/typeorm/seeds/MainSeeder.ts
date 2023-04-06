import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import { runSeeder } from 'typeorm-extension';
import { PostgresDataSource } from '../../../../../ormconfig';
import StarterDBSeed from './StarterDBSeed';

(async () => {


    await PostgresDataSource.initialize();
    await runSeeder(PostgresDataSource, StarterDBSeed);
})().then(() => {
    console.log('ola')
    process.exit(0)
}).catch(e => {
    console.log('e', e)
    process.exit(1)
})