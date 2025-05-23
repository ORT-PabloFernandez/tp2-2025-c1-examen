import { getSales, getSaleById, searchClientSales, searchTopProducts, updateCuponById, searchTotal } from "../services/salesService.js";

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
        const sale = await getSaleById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(sale);
    } catch (error) {
        console.log("Error fetching sale: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCoupon = async (req, res) => {
    try {
        const sale = await updateCuponById(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(sale);
    } catch (error) {
        console.log("Error updating coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getClientSales = async (req, res) => {
    try {
        const email = req.params.email
        const sales = await searchClientSales(email);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sale: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTopProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const sales = await searchTopProducts(limit);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTotal = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await searchTotal(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
