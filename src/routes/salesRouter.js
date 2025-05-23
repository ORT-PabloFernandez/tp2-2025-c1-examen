import express from "express";
import { getAllSales, getSale, getSaleByCustomerEmailController, getSalesWithTotalController, updateCouponController } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getAllSales);
router.get("/sales/:id", authMiddleware, getSale);
router.get("/sales/total", authMiddleware ,getSalesWithTotalController);
router.get("/sales/customer/:email", authMiddleware, getSaleByCustomerEmailController);
router.put("/sales/:id/couponUsed", authMiddleware, updateCouponController);

export default router;
