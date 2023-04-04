import { OrderController } from "@modules/Order/infra/http/controllers/OrderController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post("/", celebrate({
  [Segments.BODY]: {
    id: Joi.string().alphanum().required(),
  },
}),
  orderController.create
);

orderRoutes.get("/", orderController.list)

orderRoutes.get(
  '/:id/show',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().alphanum().required(),
    },
  }),
  orderController.show
);

orderRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().alphanum().required(),
    },
  }),
  orderController.delete
);

export { orderRoutes }