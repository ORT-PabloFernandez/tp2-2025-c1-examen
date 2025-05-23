import {
  getSales,
  getSaleById,
  getSalesTotal,
  getVentasCliente,
  getUpdateCoupon,
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

export const getSaleByIdController = async (req, res) => {
  try {
    const sale = await getSaleById(req.params.id);
    res.json(sale);
  } catch (error) {
    console.log("Error fetching sale: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSalesTotalController = async (req, res) => {
  try {
    const sales = await getSalesTotal();
    res.json(sales);
  } catch (error) {
    console.log("Error fetching totales: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVentasClienteController = async (req, res) => {
  try {
    const sales = await getVentasCliente(req.params.email);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching ventas del cliente: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUpdateCouponController = async (req, res) => {
  try {
    const sale = await getUpdateCoupon(req.params.id);
    res.json(sale);
  } catch (error) {
    console.log("Error fetching cupon actualizado: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
