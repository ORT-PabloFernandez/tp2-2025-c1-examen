import { getSales, getSaleById as getSaleByIdService, getSalesWithTotal as getSalesWithTotalService, getSalesByCustomerEmail as getSalesByCustomerEmailService, updateSaleCouponUsed as updateSaleCouponUsedService } from "../services/salesService.js";

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

export const getSaleById = async (req, res) => {
    try {
        const sale = await getSaleByIdService(req.params.id);
        if (!sale) {
            return res.status(404).json({ message: "no existe la venta" });
        }
        res.json(sale);
    } catch (error) {
        if (error.message === 'error en la busqueda de la venta') {
            return res.status(400).json({ message: error.message });
        }
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesWithTotal = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSalesWithTotalService(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales with total: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesByCustomerEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const sales = await getSalesByCustomerEmailService(email);
        if (!sales || sales.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas para este email" });
        }
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales by email: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateSaleCouponUsed = async (req, res) => {
    try {
        const { id } = req.params;
        const { couponUsed } = req.body;

        if (typeof couponUsed !== 'boolean') {
            return res.status(400).json({ 
                message: "El valor de couponUsed debe ser un booleano (true/false)" 
            });
        }

        const updatedSale = await updateSaleCouponUsedService(id, couponUsed);
        
        if (!updatedSale) {
            return res.status(404).json({ 
                message: "No se encontró la venta con el ID especificado" 
            });
        }

        res.json(updatedSale);
    } catch (error) {
        console.log("Error updating sale coupon: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
