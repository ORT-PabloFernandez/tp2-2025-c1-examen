import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllSales,
  getSalesTotal,
  getSaleTotal,
  getSalesByCustomer,
  updateCouponUsed,
  getSale
} from "../controllers/salesController.js";

const router = express.Router();

router.use(authMiddleware);
router.get("/", getAllSales);
router.get("/total/:id", getSaleTotal);
router.get("/total", getSalesTotal);
router.get("/customer/:email", getSalesByCustomer);
router.patch("/coupon/:id", updateCouponUsed);
router.get("/:id", getSale);

export default router;