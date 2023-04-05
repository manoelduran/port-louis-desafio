import { InvoiceOrderNotFoundException } from "../exceptions/InvoiceOrderNotFoundException";
import { InvoiceOrder } from "../infra/persistence/entity/InvoiceOrder";
import { CreateInvoiceOrderDTO } from "../dtos/CreateInvoiceOrderDTO";



interface IInvoiceOrdersRepository {
    create(txtData: CreateInvoiceOrderDTO): Promise<InvoiceOrder>;
    findByItemNumber(item_number: number): Promise<InvoiceOrderNotFoundException | InvoiceOrder>;
    findByOrderId(order_id: string): Promise<InvoiceOrderNotFoundException | InvoiceOrder>;
    findByInvoiceId(invoice_id: string): Promise<InvoiceOrderNotFoundException | InvoiceOrder>;
    delete(invoiceOrder: InvoiceOrder): Promise<void>;
    list(): Promise<InvoiceOrder[]>;
    save(data: InvoiceOrder): Promise<InvoiceOrder>;
};

export { IInvoiceOrdersRepository };