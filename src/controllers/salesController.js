import { getSales, getSaleById, getSalesWithTotal, getSalesWithTotalById, getSalesByCustomerEmail, updateSaleCouponUsed } from "../services/salesService.js";

export const getAllSales = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSales(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSale = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await getSaleById(id);
        if (!sale) {
            return res.status(404).json({ message: "No se ha encontrado la venta." });
        }
        res.json(sale);
    } catch (error) {
        console.log("Error fetching sale: ", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const getSalesTotal = async (req, res) => {
    try {
        const sales = await getSalesWithTotal();
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales with total: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSaleTotal = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await getSalesWithTotalById(id);
        if (!sale) {
            return res.status(404).json({ message: "No se ha encontrado la venta." });
        }
        res.json(sale);
    } catch (error) {
        console.log("Error fetching sales with total: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesByCustomer = async (req, res) => {
  try {
    const email = req.params.email;
    console.log("getSalesByCustomer, email:", email);
    const sales = await getSalesByCustomerEmail(email);
    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCouponUsed = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const couponUsed = req.body.couponUsed;
    if (typeof couponUsed !== "boolean") {
      return res
        .status(400)
        .json({ message: "Debe enviar couponUsed como booleano" });
    }
    const updated = await updateSaleCouponUsed(id, couponUsed);
    if (!updated) {
      return res
        .status(404)
        .json({ message: "Venta no encontrada o sin cambios" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error updating couponUsed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};