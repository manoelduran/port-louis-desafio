import { Mapper } from '@shared/domain/Mapper';
import { OrderProduct } from '../infra/persistence/entity/OrderProduct';
import { CreateOrderProductDTO } from '../dtos/CreateOrderProductDTO';


export class OrderProductsMapper implements Mapper<OrderProduct> {
    public static toPersistence(txtData?: CreateOrderProductDTO): OrderProduct {
        return {
            item_number: txtData.numero_item ,
            order_id: txtData.pedido_id ,
            product_code:  txtData.codigo_produto,
            product_quantity: txtData.quantidade_produto
        };
    };

    public static toTxt(persistence: OrderProduct): CreateOrderProductDTO {
        return {
            numero_item: persistence.item_number,
            pedido_id: persistence.order_id,
            codigo_produto: persistence.product_code,
            quantidade_produto: persistence.product_quantity
        };
    };
};
