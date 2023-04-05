import { CreateInvoiceDTO } from "@modules/Invoice/dtos/CreateInvoiceDTO";
import { InvoiceNotFoundException } from "@modules/Invoice/exceptions/InvoiceNotFoundException";
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { InvoiceMapper } from "@modules/Invoice/mapper/InvoiceMapper";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";


class InvoiceRepositoryInMemory implements IInvoicesRepository {
    private invoices: Invoice[];
    constructor() {
        this.invoices = [];
    }
    async create(data: CreateInvoiceDTO): Promise<Invoice> {
        const newInvoice = new Invoice();
        Object.assign(newInvoice, InvoiceMapper.toPersistence(data));
        this.save(newInvoice);
        return newInvoice;
    };
    async save(data: Invoice): Promise<Invoice> {
         this.invoices.push(data);
        return data;
    };
    async findById(id: string): Promise<InvoiceNotFoundException | Invoice> {
        const invoice = this.invoices.find(invoice => invoice.id === id);
        if (!invoice) {
            throw new InvoiceNotFoundException();
        };
        return invoice;
    };
    async list(): Promise<Invoice[]> {
        const invoices = this.invoices;
        return invoices;
    };
    async delete(id: string): Promise<void> {
        const invoices = this.invoices.filter(invoice => invoice.id !== id);
        this.invoices = invoices;
        return;
    }

};

export { InvoiceRepositoryInMemory };