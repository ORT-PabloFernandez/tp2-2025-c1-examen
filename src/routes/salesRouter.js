import express from "express";
import { getAllSales, getSaleByIdController, addTotalSalesController, salesByEmailController, updateCouponUsedController } from "../controllers/salesController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllSales);
router.get("/total",authMiddleware, addTotalSalesController);
router.get("/:id", authMiddleware, getSaleByIdController);
router.get("/customer/:email",authMiddleware, salesByEmailController);
router.put("/cupon/:id", authMiddleware,updateCouponUsedController);

export default router;
