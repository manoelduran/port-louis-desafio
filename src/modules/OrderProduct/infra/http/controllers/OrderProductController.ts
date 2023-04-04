
import { OrderProductAlreadyExistsException } from '@modules/OrderProduct/exceptions/OrderProductAlreadyExistsException';
import { OrderProductNotFoundException } from '@modules/OrderProduct/exceptions/OrderProductNotFoundException';
import { OrderProductsMapper } from '@modules/OrderProduct/mapper/OrderProductsMapper';
import { CreateOrderProductService } from '@modules/OrderProduct/services/CreateOrderProduct/CreateOrderProductService';
import { DeleteOrderProductService } from '@modules/OrderProduct/services/DeleteOrderProduct/DeleteOrderProductService';
import { ListOrderProductsService } from '@modules/OrderProduct/services/ListOrderProducts/ListOrderProductsService';
import { ShowOrderProductsService } from '@modules/OrderProduct/services/ShowOrderProducts/ShowOrderProductsService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


class OrderProductController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listOrderProductsService = container.resolve(ListOrderProductsService);

        const orderProducts = await listOrderProductsService.execute();

        return response.status(200).json(instanceToInstance(orderProducts));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createOrderProductService = container.resolve(CreateOrderProductService);

        const orderProduct = await createOrderProductService.execute({
            ...body,
        });
        if (orderProduct instanceof OrderProductAlreadyExistsException) {
            throw new OrderProductAlreadyExistsException()
        }
        return response.status(201).json(instanceToInstance(orderProduct));
    };
    public async delete(request: Request, response: Response): Promise<Response> {
        const { numero_item } = request.params;
        const deleteOrderProductService = container.resolve(DeleteOrderProductService);

        const orderProductOrError = await deleteOrderProductService.execute({ item_number: Number(numero_item) });
        if (orderProductOrError instanceof  OrderProductNotFoundException) {
            throw new OrderProductNotFoundException();
        };

        return response.status(204).send('Order Product Deleted!');
    };
    public async show(request: Request, response: Response): Promise<Response> {
        const { numero_item } = request.params;
        const showOrderProductsService = container.resolve(ShowOrderProductsService);
        const orderProductOrError = await showOrderProductsService.execute({ item_number: Number(numero_item) });
        if (orderProductOrError instanceof OrderProductNotFoundException) {
            throw new OrderProductNotFoundException();
        };
        return response.status(200).json(OrderProductsMapper.toTxt(orderProductOrError));
    };
};

export { OrderProductController };