import { InvoiceOrderController } from "@modules/InvoiceOrder/infra/http/controllers/InvoiceOrderController";
import { OrderProductController } from "@modules/OrderProduct/infra/http/controllers/OrderProductController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";



const invoiceOrderRoutes = Router();

const invoiceOrderController = new InvoiceOrderController();
invoiceOrderRoutes.post("/", celebrate({
  [Segments.BODY]: {
    numero_item: Joi.number().positive().integer().required(),
    invoice_id: Joi.string().alphanum().required(),
    pedido_id: Joi.string().alphanum().required(),
    quantidade_produto: Joi.number().integer().positive().required(),
  },
}),
  invoiceOrderController.create
);

invoiceOrderRoutes.get("/", invoiceOrderController.list)

invoiceOrderRoutes.get(
  '/:numero_item/show',
  celebrate({
    [Segments.PARAMS]: {
      numero_item: Joi.number().positive().integer().required(),
    },
  }),
  invoiceOrderController.show
);

invoiceOrderRoutes.delete(
  '/:numero_item',
  celebrate({
    [Segments.PARAMS]: {
      numero_item: Joi.number().positive().integer().required(),
    },
  }),
  invoiceOrderController.delete
);

export { invoiceOrderRoutes }