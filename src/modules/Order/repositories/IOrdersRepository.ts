import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { CreateOrderDTO } from "@modules/Order/dtos/CreateOrderDTO";
import { ItemNumberNeedBeUniqueException } from "../exceptions/ItemNumberNeedBeUniqueException";


interface IOrdersRepository {
    create(data: CreateOrderDTO): Promise<Order>;
    findById(id: string): Promise<OrderNotFoundException | Order>;
    delete(id: string): Promise<void>;
    list(): Promise<Order[]>;
    save(data: Order): Promise<Order>;
};

export { IOrdersRepository };