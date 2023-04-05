
import { InvoiceOrderAlreadyExistsException } from '@modules/InvoiceOrder/exceptions/InvoiceOrderAlreadyExistsException';
import { InvoiceOrderNotFoundException } from '@modules/InvoiceOrder/exceptions/InvoiceOrderNotFoundException';
import { InvoiceOrdersMapper } from '@modules/InvoiceOrder/mapper/InvoiceOrdersMapper';
import { CreateInvoiceOrderService } from '@modules/InvoiceOrder/services/CreateInvoiceOrder/CreateInvoiceOrderService';
import { DeleteInvoiceOrderService } from '@modules/InvoiceOrder/services/DeleteInvoiceOrder/DeleteInvoiceOrderService';
import { ListInvoiceOrdersService } from '@modules/InvoiceOrder/services/ListInvoiceOrders/ListInvoiceOrdersService';
import { ShowInvoiceOrderService } from '@modules/InvoiceOrder/services/ShowInvoiceOrder/ShowInvoiceOrderService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


class InvoiceOrderController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listInvoiceOrdersService = container.resolve(ListInvoiceOrdersService);

        const invoiceOrders = await listInvoiceOrdersService.execute();

        return response.status(200).json(instanceToInstance(invoiceOrders));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createInvoiceOrderService = container.resolve(CreateInvoiceOrderService);

        const invoiceOrders = await createInvoiceOrderService.execute({
            ...body,
        });
        if (invoiceOrders instanceof InvoiceOrderAlreadyExistsException) {
            throw new InvoiceOrderAlreadyExistsException()
        }
        return response.status(201).json(instanceToInstance(invoiceOrders));
    };
    public async delete(request: Request, response: Response): Promise<Response> {
        const { numero_item } = request.params;
        const deleteInvoiceOrderService = container.resolve(DeleteInvoiceOrderService);

        const invoiceOrders = await deleteInvoiceOrderService.execute({ item_number: Number(numero_item) });
        if (invoiceOrders instanceof  InvoiceOrderNotFoundException) {
            throw new InvoiceOrderNotFoundException();
        };

        return response.status(204).send('Invoice Order  Deleted!');
    };
    public async show(request: Request, response: Response): Promise<Response> {
        const { numero_item } = request.params;
        const showInvoiceOrdersService = container.resolve(ShowInvoiceOrderService);
        const invoiceOrders = await showInvoiceOrdersService.execute({ item_number: Number(numero_item) });
        if (invoiceOrders instanceof InvoiceOrderNotFoundException) {
            throw new InvoiceOrderNotFoundException();
        };
        return response.status(200).json(InvoiceOrdersMapper.toTxt(invoiceOrders));
    };
};

export { InvoiceOrderController };