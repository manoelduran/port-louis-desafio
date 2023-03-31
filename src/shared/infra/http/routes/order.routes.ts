import { OrderController } from "@modules/Order/infra/http/controllers/OrderController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post("/", celebrate({
  [Segments.BODY]: {
    id: Joi.string().alphanum().required(),
    item: Joi.object().keys({
      number: Joi.number().positive().integer().required(),
      code: Joi.string().alphanum().required(),
      quantity: Joi.number().integer().positive().required(),
      value: Joi.number().positive().precision(2)
    }),
  },
}),
  orderController.create
);

orderRoutes.get("/", orderController.list)

export { orderRoutes }