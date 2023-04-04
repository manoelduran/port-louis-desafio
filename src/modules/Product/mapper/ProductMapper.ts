import { Mapper } from '@shared/domain/Mapper';
import { Product } from '@modules/Product/infra/persistence/entity/Product';
import { CreateProductDTO } from '@modules/Product/dtos/CreateProductDTO';


export class ProductMapper implements Mapper<Product> {
    public static toPersistence(txtData: CreateProductDTO): Product {
        return {
            product_code: txtData.product_code,
            unit_value: txtData.unit_value,

        };
    }

    public static toTxt(persistence: Product): CreateProductDTO {
        return {
           product_code: persistence.product_code,
           unit_value: persistence.unit_value
        };
    }
}
