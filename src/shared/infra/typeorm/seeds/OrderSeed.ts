import fs from 'fs';
import path from 'path';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import unidecode from 'unidecode';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { FolderDTO } from './dtos/FolderDTO';
import { DataSource } from 'typeorm';
import { PostgresDataSource } from '../../../../../ormconfig';
import { OrderMapper } from '@modules/Order/mapper/OrderMapper';
import { Order } from '@modules/Order/infra/persistence/entity/Order';
import { Invoice } from '@modules/Invoice/infra/persistence/entity/Invoice';
import { OrderProductsMapper } from '@modules/OrderProduct/mapper/OrderProductsMapper';
import { ProductMapper } from '@modules/Product/mapper/ProductMapper';
import { OrderProduct } from '@modules/OrderProduct/infra/persistence/entity/OrderProduct';
import { Product } from '@modules/Product/infra/persistence/entity/Product';
import { CreateOrderProductDTO } from '@modules/OrderProduct/dtos/CreateOrderProductDTO';


export default class OrderSeed implements Seeder {
  constructor() {
  }
  public async connect() {
   await PostgresDataSource.initialize()

  }
  public async run(dataSource: DataSource, factoryManager?: SeederFactoryManager): Promise<void> {
    await this.connect()
    const result = this.readAllOrdersFilesInsideAFolder(PostgresDataSource, { folder: 'src/assets/Pedidos' })
    console.log('result', result)
    const ormOrderProductsRepository = PostgresDataSource.getRepository(OrderProduct)
    result.toPersistenceOrderProjects.forEach((orderProduct: OrderProduct) => {

     const newOrderProduct = ormOrderProductsRepository.create(orderProduct)
     console.log('newOrderProduct', newOrderProduct)
    ormOrderProductsRepository.save(newOrderProduct)
    })

    await result.toPersistenceOrders.forEach(async (order: Order) => {

      PostgresDataSource.getMetadata("orders")
      const ormOrdersRepository = PostgresDataSource.getRepository(Order)
      ormOrdersRepository.create(order)
    })
    await result.toPersistenceProducts.forEach(async (product: Product) => {
      PostgresDataSource.getMetadata("products")
      const ormProductsRepository = PostgresDataSource.getRepository(Product)
      ormProductsRepository.create(product)
    })

  }

  private readAllOrdersFilesInsideAFolder(dataSource: DataSource, { folder }: FolderDTO): any {

    let toPersistenceOrderProjects = [] as OrderProduct[];
    let toPersistenceOrders = [] as Order[];
    let toPersistenceProducts = [] as Product[];
    const files = fs.readdirSync(folder);
    files?.forEach(file => {
      const filePath = path.join(folder, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      const fileOrders = fileData.split('\n').map(fileOrder => {
        const fileOrderWithoutSpecialCharacters = unidecode(fileOrder);
        return JSON.parse(fileOrderWithoutSpecialCharacters);
      })
      const filteredList = this.removeDuplicateIds(fileOrders) as CreateOrderProductDTO[];
      filteredList.forEach(item => {
        const formattedFile = this.removeTxtExtension(file)
        const toPersistenceOrderProject = OrderProductsMapper.toPersistence({ ...item, pedido_id: formattedFile });
        const toPersistenceOrder = OrderMapper.toPersistence({ id: toPersistenceOrderProject.order_id });
        const toPersistenceProduct = ProductMapper.toPersistence({ codigo_produto: item.codigo_produto, valor_unitario_produto: Number(item.valor_unitario_produto) })
        toPersistenceOrderProjects.push(toPersistenceOrderProject)
        toPersistenceOrders.push(toPersistenceOrder)
        toPersistenceProducts.push(toPersistenceProduct)
      })
    });

    return { toPersistenceOrderProjects, toPersistenceOrders, toPersistenceProducts }
  }
  private removeDuplicateIds(files: CreateOrderProductDTO[]) {
    const uniqueIds = new Set();
    const orderUniquesArray = files.filter(order => {
      if (!uniqueIds.has(order.numero_item)) {
        uniqueIds.add(order.numero_item);
        return true;
      }
      return false;
    });
    return orderUniquesArray;
  }
  private removeTxtExtension(file: string) {
    if (file.endsWith(".txt")) {
      return file.slice(0, -4);
    } else {
      return file;
    }
  }
  private async readAllInvoicesFilesInsideAFolder({ folder }: FolderDTO): Promise<Invoice[]> {
    return
  }

};