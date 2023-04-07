import { InvoiceOrderNotFoundException } from "../exceptions/InvoiceOrderNotFoundException";
import { InvoiceOrder } from "../infra/persistence/entity/InvoiceOrder";
import { CreateInvoiceOrderDTO } from "../dtos/CreateInvoiceOrderDTO";



interface IInvoiceOrdersRepository {
    create(txtData: CreateInvoiceOrderDTO): Promise<InvoiceOrder>;
    findById(id: string): Promise<InvoiceOrderNotFoundException | InvoiceOrder>;
    findByOrderId(order_id: string): Promise<InvoiceOrderNotFoundException | InvoiceOrder>;
    findByInvoiceId(invoice_id: string): Promise<InvoiceOrderNotFoundException | InvoiceOrder>;
    filterInvoiceOrdersByOrderId(invoices: InvoiceOrder[]): Promise<{ item_number: number, product_quantity: number, order_id: string }[]>
    findByOrderIdAndItemNumber(item_number: number, order_id: string): Promise<InvoiceOrderNotFoundException | boolean> ;
    delete(invoiceOrder: InvoiceOrder): Promise<void>;
    list(): Promise<InvoiceOrder[]>;
    save(data: InvoiceOrder): Promise<InvoiceOrder>;
};

export { IInvoiceOrdersRepository };