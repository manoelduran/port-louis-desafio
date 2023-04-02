import { DataSource } from 'typeorm';
import {Seeder, SeederFactoryManager, runSeeder} from 'typeorm-extension';
import { PostgresDataSource } from '../ormconfig';
import OrderSeed from './OrderSeed';
import InvoiceSeed from './InvoiceSeed';

export default class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
       await runSeeder(dataSource, OrderSeed)
       await runSeeder(dataSource, InvoiceSeed)
    }

}