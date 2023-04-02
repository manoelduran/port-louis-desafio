import { ProductController } from "@modules/Product/infra/http/controllers/ProductController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const productRoutes = Router();

const productController = new ProductController();

productRoutes.post("/", celebrate({
  [Segments.BODY]: {
    item_number: Joi.number().positive().integer().required(),
    code: Joi.string().alphanum().required(),
    quantity: Joi.number().integer().positive().required(),
    value: Joi.number().positive().precision(2)
  },
}),
  productController.create
);

productRoutes.get("/", productController.list);

productRoutes.get(
  '/:item_number/show',
  celebrate({
    [Segments.PARAMS]: {
      item_number: Joi.number().positive().integer().required(),
    },
  }),
  productController.show
);

productRoutes.delete(
  '/:item_number',
  celebrate({
    [Segments.PARAMS]: {
      item_number: Joi.number().positive().integer().required(),
    },
  }),
  productController.delete
);

export { productRoutes }