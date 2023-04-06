import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { OrderProductsMapper } from "@modules/OrderProduct/mapper/OrderProductsMapper";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";


class OrderProductsRepositoryInMemory implements IOrderProductsRepository {
    private orderProducts: OrderProduct[];
    constructor() {
        this.orderProducts = [];
    }
    async create(data: CreateOrderProductDTO): Promise<OrderProduct> {
        const newOrderProduct = new OrderProduct();
        Object.assign(newOrderProduct, OrderProductsMapper.toPersistence(data));
        this.save(newOrderProduct);
        return newOrderProduct;
    };
    async save(data: OrderProduct): Promise<OrderProduct> {
        this.orderProducts.push(data);
        return data;
    };
    async findByItemNumber(item_number: number): Promise<OrderProduct | OrderProductNotFoundException> {
        const orderProduct = this.orderProducts.find(order => order.item_number === item_number);
        if (!orderProduct) {
            throw new OrderNotFoundException();
        };
        return orderProduct;
    }
    async findByOrderId(order_id: string): Promise<OrderProduct | OrderProductNotFoundException> {
        const orderProduct = this.orderProducts.find(order => order.order_id === order_id);
        if (!orderProduct) {
            throw new OrderNotFoundException();
        };
        return orderProduct;
    }
    async findByProductCode(product_code: string): Promise<OrderProduct | OrderProductNotFoundException> {
        const orderProduct = this.orderProducts.find(order => order.product_code === product_code);
        if (!orderProduct) {
            throw new OrderNotFoundException();
        };
        return orderProduct;
    }
    async list(): Promise<OrderProduct[]> {
        const orderProducts = this.orderProducts;
        return orderProducts;
    };
    async delete(item_number: number): Promise<void> {
        const orderProduct = this.orderProducts.filter(order => order.item_number !== item_number);
        this.orderProducts = orderProduct;
    };

};

export { OrderProductsRepositoryInMemory };