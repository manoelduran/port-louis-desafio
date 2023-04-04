import { ProductController } from "@modules/Product/infra/http/controllers/ProductController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const productRoutes = Router();

const productController = new ProductController();

productRoutes.post("/", celebrate({
  [Segments.BODY]: {
    product_code: Joi.string().alphanum().required(),
    unit_value: Joi.number().positive().precision(2)
  },
}),
  productController.create
);

productRoutes.get("/", productController.list);

productRoutes.get(
  '/:product_code/show',
  celebrate({
    [Segments.PARAMS]: {
      product_code: Joi.string().alphanum().required(),
    },
  }),
  productController.show
);

productRoutes.delete(
  '/:product_code',
  celebrate({
    [Segments.PARAMS]: {
      product_code: Joi.string().alphanum().required(),
    },
  }),
  productController.delete
);

export { productRoutes }