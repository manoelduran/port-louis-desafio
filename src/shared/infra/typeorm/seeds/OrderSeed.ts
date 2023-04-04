import fs from 'fs';
import path from 'path';
import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import unidecode from 'unidecode';
import { Seeder, SeederFactoryManager, } from 'typeorm-extension';
import { FolderDTO } from './dtos/FolderDTO';
import { DataSource } from 'typeorm';
import { PostgresDataSource } from '../../../../../ormconfig';
import { CreateOrderDTO } from '@modules/Order/dtos/CreateOrderDTO';
import { OrderMapper } from '@modules/Order/mapper/OrderMapper';
import { Order } from '@modules/Order/infra/persistence/entity/Order';
import { Invoice } from '@modules/Invoice/infra/persistence/entity/Invoice';
import { CreateOrderProductDTO } from '@modules/OrderProduct/dtos/CreateOrderProductDTO';
import { OrderProduct } from '@modules/OrderProduct/infra/persistence/entity/OrderProduct';
import { txtOrderProduct } from '@types/txtData';

export default class OrderSeed implements Seeder {
  constructor() {
  }
  public async connect() {
    await PostgresDataSource.initialize()
  }
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await this.connect()
    const result = this.readAllOrdersFilesInsideAFolder(PostgresDataSource, { folder: 'src/assets/Pedidos' })
    const ormRepository = PostgresDataSource.getRepository(Order);
    console.log('result', result)
    console.log('ormRepository', ormRepository)
    // const savedOrders = ormRepository.create(result.map(OrderMapper.toPersistence))
    //  await ormRepository.save(savedOrders)

  }

  private readAllOrdersFilesInsideAFolder(dataSource: DataSource, { folder }: FolderDTO): CreateOrderDTO[] {
    const files = fs.readdirSync(folder);
    const result = [] as CreateOrderDTO[];
    console.log('files', files)
    files?.forEach(file => {
      console.log('file', file)
      const filePath = path.join(folder, file);
      console.log('filePath', filePath)
      const fileData = fs.readFileSync(filePath, 'utf8');
      console.log('fileData', fileData)
      const fileOrders = fileData.split('\n').map(fileOrder => {
        const fileOrderWithoutSpecialCharacters = unidecode(fileOrder);
        return JSON.parse(fileOrderWithoutSpecialCharacters);
      })
      const filteredList = this.removeDuplicateIds(fileOrders) as txtOrderProduct[];
      console.log('filtereddList', filteredList)
      const txtOrderProduct = filteredList.forEach(item => {
        console.log('item', item)
        const ola = 
      console.log('ola', ola)
      return ola
      })
    console.log('txtOrderProduct', txtOrderProduct)
      const txtOrder = {
        id: file,
      } as CreateOrderDTO;
      result.push(txtFileObject);
    });

    return result;
  }
  private removeDuplicateIds(listaPedidos) {
    const idsUnicos = new Set(); // conjunto para armazenar ids únicos
    const listaPedidosUnicos = listaPedidos.filter(pedido => {
      if (!idsUnicos.has(pedido.numero_item)) { // se o id não estiver no conjunto
        idsUnicos.add(pedido.numero_item); // adiciona o id ao conjunto
        return true; // mantém o pedido na lista
      }
      return false; // remove o pedido da lista
    });
    return listaPedidosUnicos;
  }
  private async readAllInvoicesFilesInsideAFolder({ folder }: FolderDTO): Promise<Invoice[]> {
    return
  }

};