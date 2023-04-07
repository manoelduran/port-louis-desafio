
import { injectable } from "tsyringe";
import { Repository,  } from "typeorm";
import { CreateProductDTO } from '@modules/Product/dtos/CreateProductDTO';
import { PostgresDataSource } from "../../../../../../ormconfig";
import { ProductMapper } from "@modules/Product/mapper/ProductMapper";
import { ProductNotFoundException } from "@modules/Product/exceptions/ProductNotFound";
import { Product } from "@modules/Product/infra/persistence/entity/Product";
import { IProductsRepository } from "@modules/Product/repositories/IProductsRepository";
import { OrderProduct } from "@modules/OrderProduct/infra/persistence/entity/OrderProduct";

@injectable()
class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>
    constructor() {
        this.ormRepository = PostgresDataSource.getRepository(Product);
    }
    async save(data: Product): Promise<Product> {
       const newProduct = await this.ormRepository.save(data);
        return newProduct;
    };
    async create(data: CreateProductDTO): Promise<Product> {
        const newProduct = this.ormRepository.create(ProductMapper.toPersistence(data));
        await this.save(newProduct);
        return newProduct;
    };
    async findByProductCode(product_code: string): Promise<ProductNotFoundException  |Product> {
        const foundProduct = await this.ormRepository.findOne({
            where: {
                product_code: product_code
            }
        });
        if (foundProduct instanceof ProductNotFoundException) {
            throw new ProductNotFoundException();
        };
        console.log('foundProduct', foundProduct)
        return foundProduct;
    };

   async addUnitValueToOrderProduct(data: OrderProduct): Promise<{
    item_number: number;
    order_id: string;
    product_quantity: number;
    product_code: string;
    unit_value: number;
  }> {
    const orderProductWithUnitValue = await this.ormRepository.createQueryBuilder("products")
    .where("products.product_code = :product_code", {
      product_code: data.product_code,
    })
    .getOne();

  return {
    ...data,
    unit_value: orderProductWithUnitValue.unit_value,
  };
   }
    async list(): Promise<Product[]> {
        return this.ormRepository.find();
    };
    async delete(product_code: string): Promise<void> {
        await this.ormRepository.delete(product_code);
    };
};

export { ProductsRepository };