import { DataSource } from 'typeorm';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import {Seeder, SeederFactoryManager, runSeeder} from 'typeorm-extension';
import { PostgresDataSource } from '../../../../../ormconfig';
import StarterDBSeed from './StarterDBSeed';

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
                await runSeeder(PostgresDataSource, StarterDBSeed)
    }

}