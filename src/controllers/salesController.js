import { getSales, getSaleById, getSalesWithTotal, getSalesByEmail, updateCouponUsed, getTopSellingProducts } from "../services/salesService.js";
import { ObjectId } from "mongodb";

export const getAllSales = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSales(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error recuperando todas las ventas: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getSale = async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await getSaleById(id);
        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(sale);
    } catch (error) {
        if (error.message === "ID de venta inválido") {
            return res.status(400).json({ message: error.message });
        }
        console.log("Error recuperando la venta: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getSalesTotal = async (req, res) => {
    try {
        const sales = await getSalesWithTotal();
        res.json(sales);
    } catch (error) {
        console.log("Error recuperando ventas con total: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getSalesByUserEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const sales = await getSalesByEmail(email);
        if (sales.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas para ese usuario/email" });
        }
        res.json(sales);
    } catch (error) {
        console.log("Error buscando ventas por email de usuario: ", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateCouponUsedController = async (req, res) => {
    const { id } = req.params;
    const { couponUsed } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }
    try {
        const result = await updateCouponUsed(id, couponUsed);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json({ message: "Cupón actualizado correctamente" });
    } catch (error) {
        console.error("Error actualizando cupón:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getTopProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;

    try {
        const topProducts = await getTopSellingProducts(limit);
        res.json(topProducts);
    } catch (error) {
        console.error("Error obteniendo top productos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
