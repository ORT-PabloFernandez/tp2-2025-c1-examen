import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllSales, getSaleById,getTotalAmountSales, getSalesByEmail,updateCouponValue, topProductBySales } from "../controllers/salesController.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/total",authMiddleware, getTotalAmountSales);
router.get("/top-products",authMiddleware, topProductBySales);
router.post("/customer/updateCoupon/:id",authMiddleware, updateCouponValue);
router.get("/customer/:email",authMiddleware, getSalesByEmail);
router.get("/:id",authMiddleware, getSaleById);

export default router;
