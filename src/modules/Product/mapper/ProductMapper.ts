import { Mapper } from '@shared/domain/Mapper';
import { Product } from '@modules/Product/infra/persistence/entity/Product';
import { CreateProductDTO } from '@modules/Product/dtos/CreateProductDTO';


export class ProductMapper implements Mapper<Product> {
    public static toPersistence(txtData: CreateProductDTO): Product {
        return {
            item_number: txtData.item_number,
            product_code: txtData.code,
            unit_value: txtData.value,
            product_quantity: txtData.quantity,
        };
    }

    public static toTxt(persistence: Product): CreateProductDTO {
        return {
            item_number: persistence.item_number,
            code: persistence?.product_code,
            quantity: persistence.product_quantity,
            value: persistence?.unit_value
        };
    }
}
