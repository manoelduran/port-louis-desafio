import { OrderProductController } from "@modules/OrderProduct/infra/http/controllers/OrderProductController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const orderProductRoutes = Router();

const orderProductController = new OrderProductController();

orderProductRoutes.post("/", celebrate({
  [Segments.BODY]: {
    item_number: Joi.number().positive().integer().required(),
    order_id: Joi.string().alphanum().required(),
    product_quantity: Joi.number().integer().positive().required(),
    product_code: Joi.string().alphanum().required(),
  },
}),
  orderProductController.create
);

orderProductRoutes.get("/", orderProductController.list)

orderProductRoutes.get(
  '/:item_number/show',
  celebrate({
    [Segments.PARAMS]: {
      item_number: Joi.number().positive().integer().required(),
    },
  }),
  orderProductController.show
);

orderProductRoutes.delete(
  '/:item_number',
  celebrate({
    [Segments.PARAMS]: {
      item_number: Joi.number().positive().integer().required(),
    },
  }),
  orderProductController.delete
);

export { orderProductRoutes }