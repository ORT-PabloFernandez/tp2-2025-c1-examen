import express from "express";
import { getAllSales, getSaleById, getSalesWithTotal, getSalesByCustomerEmail, updateSaleCouponUsed } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllSales);
router.get("/total", authMiddleware, getSalesWithTotal);
router.get("/customer/:email", authMiddleware, getSalesByCustomerEmail);
router.get("/:id", authMiddleware, getSaleById);
router.patch("/:id/coupon", authMiddleware, updateSaleCouponUsed);

export default router;
