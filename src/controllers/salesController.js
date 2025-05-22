import { getSales, getSaleById, getSalesWithTotal, getSalesByCustomerEmail,changeCouponStatus, getTopProducts} from "../services/salesService.js";

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

export const SaleGetById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("ID: ", id);
        const sale = await getSaleById(id);
        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(sale);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllSalesWithTotal = async (req, res) => {
    try {
        const sales = await getSalesWithTotal();
        res.json(sales);
    } catch (error) {
        console.error("Error fetching sales with total:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesByCustomer = async (req, res) => {
    try {
        const email = req.params.email;
        const sales = await getSalesByCustomerEmail(email);

        if (sales.length === 0) {
            return res.status(404).json({ message: "No se encontraron ventas para ese cliente" });
        }

        res.json(sales);
    } catch (error) {
        console.error("Error fetching sales by customer:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCouponUsedController = async (req, res) => {
    try {
        const id = req.params.id;
        const { couponUsed } = req.body;

        if (typeof couponUsed !== "boolean") {
            return res.status(400).json({ message: "El valor de couponUsed debe ser booleano (true o false)" });
        }

        const updated = await changeCouponStatus(id, couponUsed);

        if (updated === 0) {
            return res.status(404).json({ message: "Venta no encontrada o sin cambios" });
        }

        res.json({ message: "Estado de couponUsed actualizado correctamente" });
    } catch (error) {
        console.error("Error actualizando couponUsed:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getTopProductsController = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const topProducts = await getTopProducts(limit);
        res.json(topProducts);
    } catch (error) {
        console.error("Error fetching top products:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};