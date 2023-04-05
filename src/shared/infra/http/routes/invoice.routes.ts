
import { InvoiceController } from "@modules/Invoice/infra/http/controllers/InvoiceController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";


const invoiceRoutes = Router();

const invoiceController = new InvoiceController();
invoiceRoutes.post("/", celebrate({
  [Segments.BODY]: {
    id: Joi.string().alphanum().required(),
  },
}),
  invoiceController.create
);

invoiceRoutes.get("/", invoiceController.list)

invoiceRoutes.get(
  '/:id/show',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().alphanum().required(),
    },
  }),
  invoiceController.show
);

invoiceRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().alphanum().required(),
    },
  }),
  invoiceController.delete
);

export { invoiceRoutes }