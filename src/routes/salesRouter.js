import express from "express";
import { getAllSales, getSaleByEmailController, getSaleByIdConnection, getTotalController, updateCouponUsedController } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/",authMiddleware, getAllSales);
router.get("/total",authMiddleware,getTotalController);
router.get("/coustomer/:email",authMiddleware,getSaleByEmailController);
router.put("/updatecupon",authMiddleware,updateCouponUsedController)
router.get("/:id",authMiddleware,getSaleByIdConnection);
export default router;
