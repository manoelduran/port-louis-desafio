import { DataSource, DataSourceOptions } from 'typeorm';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import {Seeder, SeederFactoryManager, SeederOptions, runSeeder} from 'typeorm-extension';
import OrderSeed from './OrderSeed';
import InvoiceSeed from './InvoiceSeed';
import { PostgresDataSource } from '../../../../../ormconfig';

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
            console.log('OLA')
                await runSeeder(PostgresDataSource, OrderSeed)
           // await runSeeder(PostgresDataSource, InvoiceSeed)

    }

}