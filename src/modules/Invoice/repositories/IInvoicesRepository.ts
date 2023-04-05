import { InvoiceNotFoundException } from "@modules/Invoice/exceptions/InvoiceNotFoundException";
import { CreateInvoiceDTO } from "@modules/Invoice/dtos/CreateInvoiceDTO";
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";


interface IInvoicesRepository {
    create(data: CreateInvoiceDTO): Promise<Invoice>;
    findById(id: string): Promise<InvoiceNotFoundException | Invoice>;
    delete(id: string): Promise<void>;
    list(): Promise<Invoice[]>;
    save(data: Invoice): Promise<Invoice>;
};

export { IInvoicesRepository };