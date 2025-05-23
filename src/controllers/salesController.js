import { getSales, getSalesById, getSalesWithTotalAmount, getSalesByCustomerEmail, postUpdateCouponValue, getTopProductBySales } from "../services/salesService.js";

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
    const saleID = req.params.id
    try {
        const sale = await getSalesById(saleID);
        if(!sale){
            return res.status(404).json({ message: "Venta no encontrada" });
        } 
        res.json(sale)
    } catch (error) {
        console.log("Error fetching sale: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTotalAmountSales = async (req, res) => {
    
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getSalesWithTotalAmount(page, pageSize);
        res.json(sales)
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getSalesByEmail = async (req, res) => {
    const email = req.params.email
    try {
        const sales = await getSalesByCustomerEmail(email);
        if(!sales || sales.length === 0){
            return res.status(404).json({ message: "Venta no encontrada" });
        } 
        res.json(sales)
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateCouponValue = async (req, res) => {
    const id = req.params.id
    const newValue = req.query.newValue
    try {
        const updatedRows = postUpdateCouponValue(id, newValue)
        if(!updatedRows){
            return res.status(500).json({ message: "No se pudo actualizar el registro" });
        }
        res.json({message: "Registro actualizado correctamente"})
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const topProductBySales = async (req, res) => {
    const cantidad = parseInt(req.query.cantidad)
    try {
        const topProducts = await getTopProductBySales(cantidad)
        if(!topProducts || topProducts.length === 0){
            return res.status(404).json({ message: "No se encontraron productos" });
        }
        res.json(topProducts)
    } catch (error) {
        console.log("Error fetching products: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
