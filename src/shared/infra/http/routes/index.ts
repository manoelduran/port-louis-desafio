import { Router } from 'express';
import { invoiceRoutes } from './invoice.routes';
import { orderRoutes } from './order.routes';
import { productRoutes } from './product.routes';
import { orderProductRoutes } from './orderproduct.routes';

const router = Router();

router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/orderproducts", orderProductRoutes);

export { router };