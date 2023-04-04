import { CreateOrderDTO } from "@modules/Order/dtos/CreateOrderDTO";
import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { Order } from "@modules/Order/infra/persistence/entity/Order";
import { OrderMapper } from "@modules/Order/mapper/OrderMapper";
import { IOrdersRepository } from "@modules/Order/repositories/IOrdersRepository";


class OrdersRepositoryInMemory implements IOrdersRepository {
    private orders: Order[];
    constructor() {
        this.orders = [];
    }
    async create(data: CreateOrderDTO): Promise<Order> {
        const newOrder = new Order();
        Object.assign(newOrder, OrderMapper.toPersistence(data));
        this.save(newOrder);
        return newOrder;
    };
    async save(data: Order): Promise<Order> {
        this.orders.push(data);
        return data;
    };
    async findById(id: string): Promise<OrderNotFoundException | Order> {
        const order = this.orders.find(order => order.id === id);
        if (!order) {
            throw new OrderNotFoundException();
        };
        return order;
    };
    async list(): Promise<Order[]> {
        const orders = this.orders;
        return orders;
    };
    async delete(id: string): Promise<void> {
        const orders = this.orders.filter(order => order.id !== id);
        this.orders = orders;
    };

};

export { OrdersRepositoryInMemory };