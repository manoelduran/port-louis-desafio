
import { InvoiceController } from "@modules/Invoice/infra/http/controllers/InvoiceController";
import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";


const invoiceRoutes = Router();

const invoiceController = new InvoiceController();
invoiceRoutes.post("/", celebrate({
  [Segments.BODY]: {
    id: Joi.string().alphanum().required(),
    order_id: Joi.string().alphanum().required(),
    item_numbers: Joi.array().items(Joi.number().positive().integer().required()).required(),
  },
}),
  invoiceController.create
);

invoiceRoutes.get("/", invoiceController.list)

export { invoiceRoutes }