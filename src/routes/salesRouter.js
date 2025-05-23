import express from "express";
import { getAllSales, getSale, getSalesTotal, getSalesByUserEmail, updateCouponUsedController, getTopProducts } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/total",authMiddleware, getSalesTotal);
router.get("/top-products",authMiddleware, getTopProducts);
router.get("/customer/:email",authMiddleware, getSalesByUserEmail);
router.patch("/:id/coupon",authMiddleware, updateCouponUsedController);
router.get("/:id",authMiddleware, getSale);

export default router;
