import { OrderProductNotFoundException } from "../exceptions/OrderProductNotFoundException";
import { OrderProduct } from "../infra/persistence/entity/OrderProduct";
import { CreateOrderProductDTO } from "../dtos/CreateOrderProductDTO";



interface IOrderProductsRepository {
    create(txtData: CreateOrderProductDTO): Promise<OrderProduct>;
    findByItemNumber(item_number: number): Promise<OrderProductNotFoundException | OrderProduct>;
    findByOrderId(order_id: string): Promise<OrderProductNotFoundException | OrderProduct>;
    findByProductCode(product_code: string): Promise<OrderProductNotFoundException | OrderProduct>;
    delete(item_number: number): Promise<void>;
    list(): Promise<OrderProduct[]>;
    save(data: OrderProduct): Promise<OrderProduct>;
};

export { IOrderProductsRepository };