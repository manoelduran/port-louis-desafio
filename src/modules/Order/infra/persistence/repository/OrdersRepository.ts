
import { injectable } from "tsyringe";
import { Repository,  } from "typeorm";
import { CreateOrderDTO } from '@modules/Order/dtos/CreateOrderDTO';
import { OrderNotFoundException } from '@modules/Order/exceptions/OrderNotFoundException';
import { IOrdersRepository } from '@modules/Order/repositories/IOrdersRepository';
import { OrderMapper } from '@modules/Order/mapper/OrderMapper';
import { PostgresDataSource } from "../../../../../../ormconfig";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
@injectable()
class OrdersRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>
    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(Order);
    }
    async save(data: Order): Promise<Order> {
        const newOrder = await this.ormRepository.save(data);
        return newOrder;
    };
    async create(data: CreateOrderDTO): Promise<Order> {
        const newOrder = this.ormRepository.create(OrderMapper.toPersistence(data));
        await this.save(newOrder);
        return newOrder;
    };
    async findById(id: string): Promise<OrderNotFoundException  |Order> {
        const foundOrder = await this.ormRepository.findOne({
            where: {
                id: id
            }
        });
        if (foundOrder instanceof OrderNotFoundException) {
            throw new OrderNotFoundException();
        };
        return foundOrder;
    };
    async list(): Promise<Order[]> {
        return this.ormRepository.find();
    };
    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    };
};

export { OrdersRepository };