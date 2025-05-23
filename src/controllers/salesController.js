import {
  getSales,
  getSaleById,
  getSalesByCustomerEmail,
  setCouponInSale
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
    res.json(sale);
  } catch (error) {
    console.log("Error fetching sale: ", error);
    res.status(404).json({ message: "Sale not found" });
  }
}

export const getTotal = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : undefined;
    const pageSize = req.query.pageSize
      ? parseInt(req.query.pageSize)
      : undefined;
    const sales = await getSales(page, pageSize);
    res.json(
      sales.map((s) => ({
        ...s,
        total: calculateTotal(s.items),
      }))
    );
  } catch (error) {
    console.log("Error fetching sales: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllSalesByCustomer = async (req, res) => {
  try {
    const sales = await getSalesByCustomerEmail(req.params.email);
    res.json(sales);
  } catch (error) {
    console.log("Error fetching sales: ", error);
    res.status(404).json({ message: "No sales registered with this mail" });
  }
};

const calculateTotal = (items) => {
  let total = 0;
  items.forEach((item) => {
    console.log(item.price);
    total += item.price * item.quantity;
  });
  return total;
};

export const changeCoupon = async (req, res) => {
    try {
        const sale = await setCouponInSale(req.params.id)
        res.json(sale)
    } catch (error) {
        console.log("Error fetching sale: ", error);
        res.status(404).json({ message: "Sale not found" });
    }
}

// const calculateTopProducts = (sales, limit) {
//     const items = sales.map(s => {
//         s.items
//     })

// }
// 1. listar todos os tipos de item por nome (array de tamanho x)
// 2. para cada tipo de item, somar quantidade (array de tamanho x)
// 3. ordenar array e devolver primeiros n items