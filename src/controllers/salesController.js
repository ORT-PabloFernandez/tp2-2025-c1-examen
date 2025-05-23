import { getSales, getSaleById, getSalesWithTotal, getSaleByCustomerEmail, updateCouponService } from "../services/salesService.js";

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

export const getSale = async (req,res) => {
    try {
        const sale = await getSaleById(req.params.id);
        if(!sale) {
            return res.status(404).json({message: "Venta no encontrada"});
        }
        res.json(sale);
    } catch (error) {
        console.error("Error fetching sales: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getSalesWithTotalController = async (req,res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;

        const sales = await getSalesWithTotal(page,pageSize);
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener ventas con total", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getSaleByCustomerEmailController = async (req,res) => {
    const email = req.params.email;

    try {
        const sales = await getSaleByCustomerEmail(email);
        if (sales.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas para este email"});
        }
        res.json(sales);
    } catch (error) {
        console.error("Error al obtener ventas por email", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateCouponController = async (req,res) => {
    const id = req.params.id;
    const couponUsed  = req.body;

    if (typeof couponUsed !== "boolean") {
        return res.status(400).json({ message: "couponUsed debe ser true o false"});
    }

    try {
        const updatedSale = await updateCouponService(id, couponUsed);
        if (!updatedSale) {
            return res.status(404).json({ message: "Venta no encontrada o ID inválido"});
        }
        res.json({ message: "Venta actualizada correctamente", updatedSale});
    } catch (error) {
        console.error("Error al actualizar couponUsed", error);
        res.status(500).json({message: "Internal server error"});
    }
}
