import fs from 'fs';
import path from 'path';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import { Order } from '@modules/Order/infra/persistence/entity/Order';
import { Invoice } from '@modules/Invoice/infra/persistence/entity/Invoice';
import {Seeder, SeederFactoryManager, SeederOptions} from 'typeorm-extension';
import { FolderDTO } from './dtos/FolderDTO';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresDataSource } from '../../../../../ormconfig';


export default class InvoiceSeed implements Seeder {
  constructor() { }
 public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {

  const ola = await this.readAllOrdersFilesInsideAFolder(dataSource, {folder: 'src/assets/Notas'})
  console.log('ola', ola)
   const ordersRepository = PostgresDataSource.getRepository(Order);
   const invoicesRepository = PostgresDataSource.getRepository(Invoice);
  }

  private async readAllOrdersFilesInsideAFolder(dataSource: DataSource,{ folder }: FolderDTO): Promise<Order[]> {
    const files = fs.readdirSync(folder);
    const orders = files?.map(file => {
      const filePath = path.join(folder, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      const order = JSON.parse(fileData);
      console.log('order', order);
      return order;
    });
    console.log('orders', orders)
   // await PostgresDataSource.createQueryBuilder().insert().into(Order).values(orders).execute()
    return orders;
  }
  private async readAllInvoicesFilesInsideAFolder({ folder }: FolderDTO): Promise<Invoice[]> {
    return
  }

};