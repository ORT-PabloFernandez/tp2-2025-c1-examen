import express from "express";
import {
  getAllSales,
  getSale,
  getSalesByCustomer,
  getSalesWithTotal,
  changeStateCoupon,
} from "../controllers/salesController.js";

const router = express.Router();
router.get("/total", getSalesWithTotal);
router.get("/customer/:email", getSalesByCustomer);
router.get("/", getAllSales);
router.get("/:id", getSale);

router.patch("/:id", changeStateCoupon);

export default router;
