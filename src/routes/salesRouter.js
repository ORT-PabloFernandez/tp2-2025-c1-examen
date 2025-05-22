import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllSales, SaleGetById, getAllSalesWithTotal, getSalesByCustomer,updateCouponUsedController, getTopProductsController} from "../controllers/salesController.js";

const router = express.Router();
router.get("/", authMiddleware, getAllSales);
router.get("/total", authMiddleware, getAllSalesWithTotal);
router.get("/customer/:email", authMiddleware,getSalesByCustomer);
router.get("/top-products", authMiddleware, getTopProductsController);
router.get("/:id", authMiddleware, SaleGetById);

router.patch("/:id/coupon", authMiddleware, updateCouponUsedController);

export default router;

