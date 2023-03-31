import { Mapper } from '@shared/domain/Mapper';
import { Invoice } from '@modules/Invoice/infra/persistence/entity/Invoice';
import { CreateInvoiceDTO } from '@modules/Invoice/dtos/CreateInvoiceDTO';

export class InvoiceMapper implements Mapper<Invoice> {
    public static toPersistence(txtData: CreateInvoiceDTO): Invoice {
        return {
            id: txtData.id,
            order_id: txtData.order_id,
            item_number: txtData.item.number,
            product_quantity: txtData.item.quantity,
        };
    }

    public static toTxt(persistence: Invoice): CreateInvoiceDTO {
        return {
            id: persistence.id,
            item: {
                number: persistence.item_number,
                quantity: persistence.product_quantity,
            },
            order_id: persistence.order_id
        };
    }
}
