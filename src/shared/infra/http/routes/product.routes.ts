import { ProductController } from "@modules/Product/infra/http/controllers/ProductController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const productRoutes = Router();

const productController = new ProductController();

productRoutes.post("/", celebrate({
  [Segments.BODY]: {
    codigo_produto: Joi.string().alphanum().required(),
    valor_unitario_produto: Joi.number().positive().precision(2)
  },
}),
  productController.create
);

productRoutes.get("/", productController.list);

productRoutes.get(
  '/:codigo_produto/show',
  celebrate({
    [Segments.PARAMS]: {
      codigo_produto: Joi.string().alphanum().required(),
    },
  }),
  productController.show
);

productRoutes.delete(
  '/:codigo_produto',
  celebrate({
    [Segments.PARAMS]: {
      codigo_produto: Joi.string().alphanum().required(),
    },
  }),
  productController.delete
);

export { productRoutes }