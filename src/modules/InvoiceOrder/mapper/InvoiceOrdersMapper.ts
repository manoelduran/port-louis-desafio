import { Mapper } from '@shared/domain/Mapper';
import { InvoiceOrder } from '../infra/persistence/entity/InvoiceOrder';
import { CreateInvoiceOrderDTO } from '../dtos/CreateInvoiceOrderDTO';


export class InvoiceOrdersMapper implements Mapper<InvoiceOrder> {
    public static toPersistence(txtData?: CreateInvoiceOrderDTO): InvoiceOrder {
        return {
            item_number: txtData.numero_item ,
            order_id: txtData.pedido_id ,
            invoice_id: txtData.invoice_id,
            product_quantity: txtData.quantidade_produto
        };
    };

    public static toTxt(persistence: InvoiceOrder): CreateInvoiceOrderDTO {
        return {
            numero_item: persistence.item_number,
            pedido_id: persistence.order_id,
            invoice_id: persistence.invoice_id,
            quantidade_produto: persistence.product_quantity
        };
    };
};
