import { getSales, getSaleByIdService, addTotalSalesService, salesByEmailService, updateCouponUsedService } from "../services/salesService.js";

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

export const getSaleByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await getSaleByIdService(id);
        if (!sale) {
            res.status(404).json({ message: "Venta no encontrada" });
        }
        res.json(sale)
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addTotalSalesController = async (req,res)=>{
    try{
        const sales = await addTotalSalesService();
        res.json(sales);
    }catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const salesByEmailController = async (req,res)=>{
    try{
        const email = req.params.email;
        const sales = await salesByEmailService(email);
        res.json(sales);
    }catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCouponUsedController = async (req, res)=>{
    try{
        const id = req.params.id;
        const coupon = req.body;
        const result = await updateCouponUsedService(id, coupon);
        res.status(200).json({ message: "Cupon modificado correctamente" });
    }catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}