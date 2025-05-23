import express from "express";
import { getAllSales, getSale, getTotal, getAllSalesByCustomer, changeCoupon } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllSales);
router.get("/total", authMiddleware, getTotal)
router.get("/customer/:email", authMiddleware, getAllSalesByCustomer)
router.get("/:id", authMiddleware, getSale)
router.put("/:id/changeCoupon", authMiddleware, changeCoupon)

export default router;
