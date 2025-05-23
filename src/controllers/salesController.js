import { getSales, getSaleById, getSalesWithTotal, getSalesByEmailUser, changeCouponUsage } from "../services/salesService.js";

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
    try{
        const sale = await getSaleById(req.params.id);
        if(!sale){
            return res.status(404).json({message: "Sale no encontrada"});
        }
        res.json(sale);
    } catch(error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSalesWithTotalController = async (req, res) => {
    try{
        const sales = await getSalesWithTotal();
        res.json(sales);
    } catch(error){
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSalesByEmailUserControllers = async (req, res) => {
    try{
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSalesByEmailUser(req.params.email, page, pageSize);
        res.json(sales);
    }catch(error){
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCouponUsageController = async (req, res) => {
    const {id} = req.params;
    const {couponUsed} = req.body;
    try{
        const update = await changeCouponUsage(id, couponUsed);
        res.json(update);
    }catch(error){
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}