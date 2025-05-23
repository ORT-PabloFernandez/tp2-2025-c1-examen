import express from "express";
import {
  getAllSales,
  getSaleByIdController,
  getSalesTotalController,
  getVentasClienteController,
  getUpdateCouponController,
} from "../controllers/salesController.js";

const router = express.Router();
router.get("/", getAllSales);
router.get("/total", getSalesTotalController);
router.get("/customer/:email", getVentasClienteController);
router.put("/updateCoupon/:id", getUpdateCouponController);
router.get("/:id", getSaleByIdController);

export default router;
