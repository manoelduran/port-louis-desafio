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
  '/:id/show',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderProductController.show
);

orderProductRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  orderProductController.delete
);

export { orderProductRoutes }