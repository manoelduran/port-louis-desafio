import { CreateInvoiceDTO } from "@modules/Invoice/dtos/CreateInvoiceDTO";
import { InvoiceNotFoundException } from "@modules/Invoice/exceptions/InvoiceNotFoundException";
import { Invoice } from "@modules/Invoice/infra/persistence/entity/Invoice";
import { IInvoicesRepository } from "@modules/Invoice/repositories/IInvoicesRepository";


class InvoiceRepositoryInMemory implements IInvoicesRepository {
    private invoices: Invoice[];
    constructor() {
        this.invoices = [];
    };
    async create(data: CreateInvoiceDTO): Promise<Invoice> {
        const newInvoice = new Invoice();
        Object.assign(newInvoice, data);
        this.invoices.push(newInvoice);
        return newInvoice;
    };
    async findByOrder(order_id: string): Promise<InvoiceNotFoundException | Invoice> {
        const invoice = this.invoices.find(invoice => invoice.order_id === order_id);
        if (!invoice) {
            throw new InvoiceNotFoundException();
        };
        return invoice;
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