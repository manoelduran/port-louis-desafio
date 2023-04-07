import { OrderNotFoundException } from "@modules/Order/exceptions/OrderNotFoundException";
import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";
import { IOrderProductsRepository } from "../IOrderProductsRepository";
import { OrderProductsMapper } from "@modules/OrderProduct/mapper/OrderProductsMapper";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";


class OrderProductsRepositoryInMemory implements IOrderProductsRepository {
    private orderProducts: OrderProduct[];
    constructor() {
        this.orderProducts = [];
    }
    findById(id: string): Promise<OrderProduct | OrderProductNotFoundException> {
        throw new Error("Method not implemented.");
    }
    findOrderProductsByOrderIdAndItemNumber(item_number: number, order_id: string): Promise<{ item_number: number; order_id: string; product_quantity: number; product_code: string; }> {
        throw new Error("Method not implemented.");
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
    async delete(orderProduct: OrderProduct): Promise<void> {
        const removedOrderProduct = this.orderProducts.filter(order => order.id !== orderProduct.id);
        this.orderProducts = removedOrderProduct;
    };

};

export { OrderProductsRepositoryInMemory };