
import { injectable } from "tsyringe";
import { Repository, } from "typeorm";
import { PostgresDataSource } from "../../../../../../ormconfig";
import { OrderProduct } from "../entity/OrderProduct";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";
import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { OrderProductsMapper } from "@modules/OrderProduct/mapper/OrderProductsMapper";
@injectable()
class OrderProductsRepository implements IOrderProductsRepository {
    private ormRepository: Repository<OrderProduct>
    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(OrderProduct);
    }

    async save(data: OrderProduct): Promise<OrderProduct> {
        const newOrderProducts = await this.ormRepository.save(data);
        return newOrderProducts;
    };
    async create(data: CreateOrderProductDTO): Promise<OrderProduct> {
        const newOrderProducts = this.ormRepository.create(OrderProductsMapper.toPersistence(data));
        await this.save(newOrderProducts);
        return newOrderProducts;
    };
    async findByItemNumber(item_number: number): Promise<OrderProduct | OrderProductNotFoundException> {
        const foundOrderProducts = await this.ormRepository.findOne({
            where: {
                item_number: item_number
            }
        });
        if (foundOrderProducts instanceof OrderProductNotFoundException) {
            throw new OrderProductNotFoundException();
        };
        return foundOrderProducts;
    };
    async findByOrderId(order_id: string): Promise<OrderProduct | OrderProductNotFoundException> {
        const foundOrderProducts = await this.ormRepository.findOne({
            where: {
                order_id: order_id
            }
        });
        if (foundOrderProducts instanceof OrderProductNotFoundException) {
            throw new OrderProductNotFoundException();
        };
        return foundOrderProducts;
    };
    async findByProductCode(product_code: string): Promise<OrderProduct | OrderProductNotFoundException> {
        const foundOrderProducts = await this.ormRepository.findOne({
            where: {
                product_code: product_code
            }
        });
        if (foundOrderProducts instanceof OrderProductNotFoundException) {
            throw new OrderProductNotFoundException();
        };
        return foundOrderProducts;
    };
    async list(): Promise<OrderProduct[]> {
        return this.ormRepository.find();
    };
    async delete(item_number: number): Promise<void> {
        await this.ormRepository.delete(item_number);
    };
};

export { OrderProductsRepository };