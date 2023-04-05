import { InvoiceNotFoundException } from '@modules/Invoice/exceptions/InvoiceNotFoundException';
import { InvoiceMapper } from '@modules/Invoice/mapper/InvoiceMapper';
import { CreateInvoiceService } from '@modules/Invoice/services/CreateInvoice/CreateInvoiceService';
import { DeleteInvoiceService } from '@modules/Invoice/services/DeleteInvoice/DeleteInvoiceService';
import { ListInvoicesService } from '@modules/Invoice/services/ListInvoices/ListInvoicesService';
import { ShowInvoiceService } from '@modules/Invoice/services/ShowInvoice/ShowInvoiceService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Invoice } from '../../persistence/entity/Invoice';


class InvoiceController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listInvoicesService = container.resolve(ListInvoicesService);

        const invoices = await listInvoicesService.execute();

        return response.status(200).json(instanceToInstance(invoices));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createInvoiceService = container.resolve(CreateInvoiceService);

        const invoiceOrError = await createInvoiceService.execute({
            ...body,
        });
        if (invoiceOrError instanceof InvoiceNotFoundException) {
            throw new InvoiceNotFoundException();
        };
        return response.status(201).json(instanceToInstance(invoiceOrError));
    };
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showInvoiceService = container.resolve(ShowInvoiceService);

        const invoiceOrError = await showInvoiceService.execute({ id });
        if (!invoiceOrError) {
            throw new InvoiceNotFoundException();
        };
        return response.status(200).json(InvoiceMapper.toTxt(invoiceOrError as Invoice));
    };
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteInvoiceService = container.resolve(DeleteInvoiceService);

        const invoiceOrError = await deleteInvoiceService.execute({ id });
        if (invoiceOrError instanceof InvoiceNotFoundException) {
            throw new InvoiceNotFoundException();
        };

        return response.status(204).send('Invoice Deleted!');
    };
};

export { InvoiceController };