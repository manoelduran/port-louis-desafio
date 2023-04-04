import { Mapper } from '@shared/domain/Mapper';
import { OrderProduct } from '../infra/persistence/entity/OrderProduct';
import { CreateOrderProductDTO } from '../dtos/CreateOrderProductDTO';
import { txtOrderProduct } from '@shared/interface/txtOrderProduct';


export class OrderProductsMapper implements Mapper<OrderProduct> {
    public static toPersistence(txtData: txtOrderProduct): OrderProduct {
        return {
            item_number: txtData.numero_item,
            order_id: txtData.id,
            product_code: txtData.codigo_produto,
            product_quantity: txtData.quantidade_produto
        };
    };

    public static toTxt(persistence: OrderProduct): txtOrderProduct {
        return {
            numero_item: persistence.item_number,
            id: persistence.order_id,
            codigo_produto: persistence.product_code,
            quantidade_produto: persistence.product_quantity
        };
    };
};
