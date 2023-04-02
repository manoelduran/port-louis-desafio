import { Mapper } from '@shared/domain/Mapper';
import { CreateOrderDTO } from '@modules/Order/dtos/CreateOrderDTO';
import { Order } from '@modules/Order/infra/persistence/entity/Order';


export class OrderMapper implements Mapper<Order> {
    public static toPersistence(txtData: CreateOrderDTO): Order {
        return {
            id: txtData.id,
            product_code: txtData.item.code,
            unit_value: txtData.item.value,
            item_number: txtData.item.number,
            product_quantity: txtData.item.quantity,
        };
    }

    public static toTxt(persistence: Order): CreateOrderDTO {
        return {
            id: persistence.id,
            item: [
                {
                    number: persistence.item_number,
                    code: persistence.product_code,
                    value: persistence.unit_value,
                    quantity: persistence.product_quantity,
                },
            ]
        };
    }
}
