import express from "express";
import { getAllSales, getSale, getClientSales, getTopProducts, updateCoupon, getTotal } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/id/:id", authMiddleware, getSale);
router.get("/customer/:email", authMiddleware, getClientSales);
router.get("/top-products", authMiddleware, getTopProducts);
router.put('/coupon/id/:id', authMiddleware, updateCoupon)
router.get("/total", authMiddleware, getTotal);


export default router;
