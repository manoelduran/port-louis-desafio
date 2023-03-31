import { Router } from 'express';
import { invoiceRoutes } from './invoice.routes';
import { orderRoutes } from './order.routes';

const router = Router();


router.use("/orders", orderRoutes);
router.use("/invoices", invoiceRoutes);

export { router };