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
invoiceOrderRoutes.get("/pendingorders", invoiceOrderController.GeneratePendingOrders)
invoiceOrderRoutes.get("/filteredlist", invoiceOrderController.listByOrderIdAndItemNumber)
invoiceOrderRoutes.get("/", invoiceOrderController.list)

invoiceOrderRoutes.get(
  '/:id/show',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  invoiceOrderController.show
);

invoiceOrderRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  invoiceOrderController.delete
);

export { invoiceOrderRoutes }