import { Mapper } from '@shared/domain/Mapper';
import { Product } from '@modules/Product/infra/persistence/entity/Product';
import { CreateProductDTO } from '../dtos/CreateProductDTO';


export class ProductMapper implements Mapper<Product> {
    public static toPersistence(txtData: CreateProductDTO): Product {
        return {
            product_code: txtData.codigo_produto,
            unit_value: txtData.valor_unitario_produto,

        };
    }

    public static toTxt(persistence: Product): CreateProductDTO {
        return {
            codigo_produto: persistence.product_code,
            valor_unitario_produto: persistence.unit_value
        };
    }
}
