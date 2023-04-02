import fs from 'fs';
import path from 'path';
import 'reflect-metadata';
import '@shared/container';
import 'dotenv/config';
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import {Seeder, SeederFactoryManager} from 'typeorm-extension';
import { PostgresDataSource} from "../ormconfig";
import { FolderDTO } from './dtos/FolderDTO';
import { DataSource } from 'typeorm';


export default class OrderSeed implements Seeder {
  constructor() { }
 public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
  const ola = await this.readAllOrdersFilesInsideAFolder({folder: 'src/assets/Pedidos'})
  console.log('ola', ola)
   const ordersRepository = dataSource.getRepository(Order);
   const invoicesRepository = dataSource.getRepository(Invoice);
  }

  private async readAllOrdersFilesInsideAFolder({ folder }: FolderDTO): Promise<Order[]> {
    const files = fs.readdirSync(folder);
    const orders = files?.map(file => {
      const filePath = path.join(folder, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      const order = JSON.parse(fileData);
      console.log('order', order);
      return order;
    });
    console.log('orders', orders)
    await PostgresDataSource.createQueryBuilder().insert().into(Order).values(orders).execute()
    return orders;
  }
  private async readAllInvoicesFilesInsideAFolder({ folder }: FolderDTO): Promise<Invoice[]> {
    return
  }

};