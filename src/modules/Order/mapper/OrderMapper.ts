import { Mapper } from '@shared/domain/Mapper';
import { CreateOrderDTO } from '@modules/Order/dtos/CreateOrderDTO';
import { Order } from '@modules/Order/infra/persistence/entity/Order';


export class OrderMapper implements Mapper<Order> {
    public static toPersistence(txtData: CreateOrderDTO): Order {
        return {
           id: txtData.id
        };
    }

    public static toTxt(persistence: Order): CreateOrderDTO {
        return {
            id: persistence.id,
        };
    }
}
