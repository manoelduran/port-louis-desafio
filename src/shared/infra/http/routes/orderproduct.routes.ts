import { OrderProductController } from "@modules/OrderProduct/infra/http/controllers/OrderProductController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const orderProductRoutes = Router();

const orderProductController = new OrderProductController();
orderProductRoutes.post("/", celebrate({
  [Segments.BODY]: {
    numero_item: Joi.number().positive().integer().required(),
    pedido_id: Joi.string().alphanum().required(),
    quantidade_produto: Joi.number().integer().positive().required(),
    codigo_produto: Joi.string().alphanum().required(),
  },
}),
  orderProductController.create
);

orderProductRoutes.get("/", orderProductController.list)

orderProductRoutes.get(
  '/:numero_item/show',
  celebrate({
    [Segments.PARAMS]: {
      numero_item: Joi.number().positive().integer().required(),
    },
  }),
  orderProductController.show
);

orderProductRoutes.delete(
  '/:numero_item',
  celebrate({
    [Segments.PARAMS]: {
      numero_item: Joi.number().positive().integer().required(),
    },
  }),
  orderProductController.delete
);

export { orderProductRoutes }