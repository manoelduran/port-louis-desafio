import { Mapper } from '@shared/domain/Mapper';
import { Order } from '@modules/Order/infra/persistence/entity/Order';
import { CreateOrderDTO } from '../dtos/CreateOrderDTO';


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
