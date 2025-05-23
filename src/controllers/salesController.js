import { getSales, getSaleById, getSalesWithTotal, getSalesByCustomerEmail, updateSaleCouponUsed, getTopProducts } from "../services/salesService.js";

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

export const getSingleSale = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await getSaleById(id);
        res.json(sale);
    } catch (error) {
        if (error.message === "Sale not found") {
            res.status(404).json({ message: error.message });
        } else {
            console.log("Error fetching sale: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getSalesTotal = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSalesWithTotal(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales with total: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCustomerSales = async (req, res) => {
    try {
        const { email } = req.params;
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSalesByCustomerEmail(email, page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching customer sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { couponUsed } = req.body;
        
        if (typeof couponUsed !== 'boolean') {
            return res.status(400).json({ message: "couponUsed must be a boolean value" });
        }

        const result = await updateSaleCouponUsed(id, couponUsed);
        res.json(result);
    } catch (error) {
        if (error.message === "Sale not found or not updated") {
            res.status(404).json({ message: error.message });
        } else {
            console.log("Error updating coupon: ", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getTopSellingProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const products = await getTopProducts(limit);
        res.json(products);
    } catch (error) {
        console.log("Error fetching top products: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
