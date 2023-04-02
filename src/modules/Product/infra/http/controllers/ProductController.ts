import { ProductAlreadyExistsException } from '@modules/Product/exceptions/ProductAlreadyExistsException';
import { ProductNotFoundException } from '@modules/Product/exceptions/ProductNotFound';
import { CreateProductService } from '@modules/Product/services/CreateProduct/CreateProductService';
import { DeleteProductService } from '@modules/Product/services/DeleteProduct/DeleteProductService';
import { ListProductsService } from '@modules/Product/services/ListProducts/ListProductsService';
import { ShowProductService } from '@modules/Product/services/ShowProduct/ShowProductService';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


class ProductController {

    public async list(request: Request, response: Response): Promise<Response> {
        const listProductsService = container.resolve(ListProductsService);

        const products = await listProductsService.execute();

        return response.status(200).json(instanceToInstance(products));
    };

    public async create(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const createProductService = container.resolve(CreateProductService);

        const product = await createProductService.execute({
            ...body,
        });
        if (product instanceof ProductAlreadyExistsException) {
            throw new ProductAlreadyExistsException()
        }
        return response.status(201).json(instanceToInstance(product));
    };
    public async delete(request: Request, response: Response): Promise<Response> {
        const { item_number } = request.params;
        const deleteProductService = container.resolve(DeleteProductService);

        const productOrError = await deleteProductService.execute({ item_number: Number(item_number) });
        if (!productOrError) {
            throw new ProductNotFoundException();
        };

        return response.status(204).send('Product Deleted!');
    };
    public async show(request: Request, response: Response): Promise<Response> {
        const { item_number } = request.params;
        const showProductService = container.resolve(ShowProductService);

        const productOrError = await showProductService.execute({ item_number: Number(item_number) });
        if (!productOrError) {
            throw new ProductNotFoundException();
        };

        return response.status(200).json(instanceToInstance(productOrError));
    };
};

export { ProductController };