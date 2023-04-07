
import { injectable } from "tsyringe";
import { Repository, } from "typeorm";
import { PostgresDataSource } from "../../../../../../ormconfig";
import { OrderProduct } from "../entity/OrderProduct";
import { OrderProductNotFoundException } from "@modules/OrderProduct/exceptions/OrderProductNotFoundException";
import { IOrderProductsRepository } from "@modules/OrderProduct/repositories/IOrderProductsRepository";
import { OrderProductsMapper } from "@modules/OrderProduct/mapper/OrderProductsMapper";
import { CreateOrderProductDTO } from "@modules/OrderProduct/dtos/CreateOrderProductDTO";
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
    async create(txtData?: CreateOrderProductDTO): Promise<OrderProduct> {
        const newOrderProducts = this.ormRepository.create(OrderProductsMapper.toPersistence(txtData));
        await this.save(newOrderProducts);
        return newOrderProducts;
    };
    async findById(id: string): Promise<OrderProductNotFoundException | OrderProduct> {

        const foundOrderProducts = await this.ormRepository.findOne({
            where: {
                id: id
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
    async findOrderProductsByOrderIdAndItemNumber(item_number: number, order_id: string): Promise<{ item_number: number, order_id: string, product_quantity: number, product_code: string }> {
        const queryBuilder =  this.ormRepository.createQueryBuilder("orderproducts")
        .select(["orderproducts.order_id", "orderproducts.item_number", "orderproducts.product_quantity", "orderproducts.product_code"])
        .where("orderproducts.item_number = :item_number", { item_number })
        .andWhere("orderproducts.order_id = :order_id", { order_id });
        try {
            const result = await queryBuilder.getOne();
            return result;
          } catch (error) {
            console.error(`Error fetching order product for item number ${item_number} and order id ${order_id}: ${error.message}`);
            return undefined;
          }
        }
    async list(): Promise<OrderProduct[]> {
        return this.ormRepository.find();
    };
    async delete(orderProduct: OrderProduct): Promise<void> {
        this.ormRepository.delete(orderProduct.id);

    };
};

export { OrderProductsRepository };