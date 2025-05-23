import express from "express";
import { getAllSales, getSaleByid, getTotalsSales, getSaleByCustomerEmail, updateCoupon, getTopRankingProducts } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware,getAllSales);
router.get("/total",authMiddleware, getTotalsSales)
router.get("/top-products",authMiddleware, getTopRankingProducts)
router.get("/customer/:email",authMiddleware, getSaleByCustomerEmail);
router.get("/:id",authMiddleware, getSaleByid )

router.put("/:id/coupon",authMiddleware, updateCoupon)

export default router;
