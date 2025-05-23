import express from "express";
import { getAllSales, getSingleSale, getSalesTotal, getCustomerSales, updateCoupon, getTopSellingProducts } from "../controllers/salesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
router.use(authMiddleware);

// Rutas existentes y nuevas
router.get("/", getAllSales);
router.get("/total", getSalesTotal);
router.get("/customer/:email", getCustomerSales);
router.get("/top-products", getTopSellingProducts);
router.get("/:id", getSingleSale);
router.patch("/:id/coupon", updateCoupon);

export default router;
