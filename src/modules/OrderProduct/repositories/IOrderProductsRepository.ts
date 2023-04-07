import { OrderProductNotFoundException } from "../exceptions/OrderProductNotFoundException";
import { OrderProduct } from "../infra/persistence/entity/OrderProduct";
import { CreateOrderProductDTO } from "../dtos/CreateOrderProductDTO";



interface IOrderProductsRepository {
    create(txtData: CreateOrderProductDTO): Promise<OrderProduct>;
    findById(id: string): Promise<OrderProductNotFoundException | OrderProduct>;
    findByOrderId(order_id: string): Promise<OrderProductNotFoundException | OrderProduct>;
    findByProductCode(product_code: string): Promise<OrderProductNotFoundException | OrderProduct>;
    delete(orderProduct: OrderProduct): Promise<void>;
    list(): Promise<OrderProduct[]>;
    findOrderProductsByOrderIdAndItemNumber(item_number: number, order_id: string): Promise<{ item_number: number, order_id: string, product_quantity: number, product_code: string }>
    save(data: OrderProduct): Promise<OrderProduct>;
};

export { IOrderProductsRepository };