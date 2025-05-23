import {
  getSales,
  getSaleById,
  salesWithTotal,
  getSalesByEmail,
} from "../services/salesService.js";

export const getAllSales = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const sales = await getSales(page, pageSize);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching sales: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function getSale(req, res) {
  try {
    const sale = await getSaleById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }
    res.json(sale);
  } catch (error) {
    console.error("Error fetching sales: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSalesWithTotal(req, res) {
  try {
    const allSalesWithTotal = await salesWithTotal();
    console.log(allSalesWithTotal);
    res.json(allSalesWithTotal);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getSalesByCustomer(req, res) {
  try {
    const email = req.params.email;
    const sales = await getSalesByEmail(email);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function changeStateCoupon(req, res) {
  try {
    const id = req.params.id;
    const { couponUsed } = req.body;

    const updated = await updateStateCoupon(id, couponUsed);
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}
