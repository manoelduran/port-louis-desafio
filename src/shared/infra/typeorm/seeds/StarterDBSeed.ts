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
import { InvoiceMapper } from '@modules/Invoice/mapper/InvoiceMapper';
import { InvoiceOrder } from '@modules/InvoiceOrder/infra/persistence/entity/InvoiceOrder';
import { InvoiceOrdersMapper } from '@modules/InvoiceOrder/mapper/InvoiceOrdersMapper';
import { FileHelper } from '@shared/helpers/fileHelper';
import { injectable } from 'tsyringe';

@injectable()
export default class StarterDBSeed implements Seeder {
  constructor() {
  }

  public async run(dataSource: DataSource, factoryManager?: SeederFactoryManager): Promise<void> {
    const result1 = this.readAllInvoicesFilesInsideAFolder({ folder: 'src/assets/Notas' })
    const result2 = this.readAllOrdersFilesInsideAFolder({ folder: 'src/assets/Pedidos' })
    const ormOrdersRepository = PostgresDataSource.getRepository(Order)
    const ormProductsRepository = PostgresDataSource.getRepository(Product)
    const ormOrderProductsRepository = PostgresDataSource.getRepository(OrderProduct)
    for (const order of result2.toPersistenceOrders) {
      const newOrder = ormOrdersRepository.create(order)
      const savedOrder = await ormOrdersRepository.save(newOrder)
      console.log('saved', savedOrder)
    }
    for (const product of result2.toPersistenceProducts) {
      const newProduct = ormProductsRepository.create(product)
      const savedProduct = await ormProductsRepository.save(newProduct)
      console.log('savedProduct', savedProduct)
    }
    for (const orderProduct of result2.toPersistenceOrderProjects) {
      const newOrderProduct = ormOrderProductsRepository.create(orderProduct)
      const savedOrderProduct = await ormOrderProductsRepository.save(newOrderProduct)
      console.log('saved', savedOrderProduct)
    }
    const ormInvoicesRepository = PostgresDataSource.getRepository(Invoice)
    const ormInvoiceOrdersRepository = PostgresDataSource.getRepository(InvoiceOrder)
    for (const invoice of result1.toPersistenceInvoices) {
      const newInvoice = ormInvoicesRepository.create(invoice)
      const savedInvoice = await ormInvoicesRepository.save(newInvoice)
      console.log('saved', savedInvoice)
    }
    for (const invoiceOrder of result1.toPersistenceInvoiceOrders) {
      const newinvoiceOrder = ormInvoiceOrdersRepository.create(invoiceOrder)
      const savedinvoiceOrder = await ormInvoiceOrdersRepository.save(newinvoiceOrder)
      console.log('saved', savedinvoiceOrder)
    }
  }

  private readAllOrdersFilesInsideAFolder({ folder }: FolderDTO): any {
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
      const filteredList = FileHelper.removeOrderProductDuplicateIds(fileOrders);
      filteredList.forEach(_item => {
        const item = {
          ..._item,
          valor_unitario_produto: Number(_item.valor_unitario_produto.replace(",", "."))
        }
        const formattedFile = FileHelper.removeTxtExtension(file)
        const toPersistenceOrderProject = OrderProductsMapper.toPersistence({ ...item, pedido_id: formattedFile });
        const toPersistenceOrder = OrderMapper.toPersistence({ id: toPersistenceOrderProject.order_id });
        const toPersistenceProduct = ProductMapper.toPersistence({ codigo_produto: item.codigo_produto, valor_unitario_produto: Number(item.valor_unitario_produto) })
        toPersistenceOrderProjects.push(toPersistenceOrderProject)
        toPersistenceOrders.push(toPersistenceOrder)
        toPersistenceProducts.push(toPersistenceProduct)
      })
    });
    const removedDuplicateIds = FileHelper.removeOrderDuplicateIds(toPersistenceOrders)
    toPersistenceOrders = removedDuplicateIds
    return { toPersistenceOrderProjects, toPersistenceOrders, toPersistenceProducts }
  }


  private readAllInvoicesFilesInsideAFolder({ folder }: FolderDTO): any {
    let toPersistenceInvoices = [] as Invoice[];
    let toPersistenceInvoiceOrders = [] as InvoiceOrder[]
    const files = fs.readdirSync(folder);
    files?.forEach(file => {
      const filePath = path.join(folder, file);
      const fileData = fs.readFileSync(filePath, 'utf8');
      const fileInvoices = fileData.split('\n').map(fileInvoice => {
        const fileInvoiceWithoutSpecialCharacters = unidecode(fileInvoice);
        return JSON.parse(fileInvoiceWithoutSpecialCharacters);
      })
      const formattedFile = FileHelper.removeTxtExtension(file)
      fileInvoices.forEach(item => {
        const toPersistenceInvoice = InvoiceMapper.toPersistence({
          id: formattedFile
        }) as Invoice
        const toPersistenceInvoiceOrder = InvoiceOrdersMapper.toPersistence({ ...item, invoice_id: formattedFile, pedido_id: item.id_pedido });
        toPersistenceInvoices.push(toPersistenceInvoice)
        toPersistenceInvoiceOrders.push(toPersistenceInvoiceOrder)
      })
      const removedDuplicateIds = FileHelper.removeInvoiceDuplicateIds(toPersistenceInvoices)
      toPersistenceInvoices = removedDuplicateIds
    });

    return { toPersistenceInvoices, toPersistenceInvoiceOrders }
  }

};