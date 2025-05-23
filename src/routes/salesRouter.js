import express from "express";
import {
	getAllSales,
	getAllSalesWithTotal,
	getSaleById,
	getAllCustomerSalesByEmail,
	getTopProducts,
	updateSaleCouponUsedController,
} from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/total", authMiddleware, getAllSalesWithTotal);
router.get("/customer/:email", authMiddleware, getAllCustomerSalesByEmail);
router.get("/top-products", authMiddleware, getTopProducts);

router.get("/", getAllSales);
router.get("/:id", authMiddleware, getSaleById);
router.patch("/:id/coupon", authMiddleware, updateSaleCouponUsedController);

export default router;
