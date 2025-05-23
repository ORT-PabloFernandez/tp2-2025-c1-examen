import express from "express";
import { getAllSales, getSale, getSalesWithTotalController, getSalesByEmailUserControllers, updateCouponUsageController } from "../controllers/salesController.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/total", getSalesWithTotalController);
router.get("/customer/:email", getSalesByEmailUserControllers);
router.put("/:id/coupon", updateCouponUsageController)
router.get("/:id" , getSale);



export default router;
