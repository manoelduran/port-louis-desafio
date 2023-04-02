import { OrderAlreadyExistsException } from '@modules/Order/exceptions/OrderAlreadyExistsException';
import { OrderNotFoundException } from '@modules/Order/exceptions/OrderNotFoundException';
import { CreateOrderService } from '@modules/Order/services/CreateOrder/CreateOrderService';
import { DeleteOrderService } from '@modules/Order/services/DeleteOrder/DeleteOrderService';
import { ListOrdersService } from '@modules/Order/services/ListOrders/ListOrdersService';
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
    public async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const deleteOrderService = container.resolve(DeleteOrderService);

        const orderOrError = await deleteOrderService.execute({ id });
        if (!orderOrError) {
            throw new OrderNotFoundException();
        };

        return response.status(204).send('Order Deleted!');
    };
};

export { OrderController };