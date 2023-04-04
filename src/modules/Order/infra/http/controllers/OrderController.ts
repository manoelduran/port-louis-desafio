import { OrderAlreadyExistsException } from '@modules/Order/exceptions/OrderAlreadyExistsException';
import { OrderNotFoundException } from '@modules/Order/exceptions/OrderNotFoundException';
import { OrderMapper } from '@modules/Order/mapper/OrderMapper';
import { CreateOrderService } from '@modules/Order/services/CreateOrder/CreateOrderService';
import { DeleteOrderService } from '@modules/Order/services/DeleteOrder/DeleteOrderService';
import { ListOrdersService } from '@modules/Order/services/ListOrders/ListOrdersService';
import { ShowOrderService } from '@modules/Order/services/ShowOrder/ShowOrderService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


class OrderController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listOrdersService = container.resolve(ListOrdersService);

        const orders = await listOrdersService.execute();

        return response.status(200).json(instanceToInstance(orders));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createOrderService = container.resolve(CreateOrderService);

        const order = await createOrderService.execute({
            ...body,
        });
        if(order instanceof OrderAlreadyExistsException) {
           throw new OrderAlreadyExistsException()
        }
        return response.status(201).json(instanceToInstance(order));
    };
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showOrderService = container.resolve(ShowOrderService);

        const orderOrError = await showOrderService.execute({ id });
        if (orderOrError instanceof OrderNotFoundException) {
            throw new OrderNotFoundException();
        };

        return response.status(200).json(OrderMapper.toTxt(orderOrError));
    };
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteOrderService = container.resolve(DeleteOrderService);

        const orderOrError = await deleteOrderService.execute({ id });
        if (orderOrError instanceof OrderNotFoundException) {
            throw new OrderNotFoundException();
        };

        return response.status(204).send('Order Deleted!');
    };
};

export { OrderController };