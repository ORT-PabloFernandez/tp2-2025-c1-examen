
import { getSaleByEmail, getSaleById, getSales, getTotal,updateSaleCouponService } from "../services/salesService.js";
import jwt from "jsonwebtoken";
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
export async function getSaleByIdConnection(req,res){
    try{
        const sale = await getSaleById(req.params.id);
        if(!sale){
            return res.status(404).json({message: "Venta no encontrada"});
        }
        res.json(sale);
    }catch(error){
        console.error("Error fecthing sales", error)
        res.status(500).json({message: "Internal server error"})
    }
}
export const getTotalController = async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : undefined;
        const sales = await getTotal(page, pageSize);
        res.json(sales);
    } catch (error) {
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export async function getSaleByEmailController(req,res){
    try{
        const sales = await getSaleByEmail(req.params.email); 
      
        if(!sales || sales.length === 0){
            return res.status(404).json({message: "No se encontraron ventas para este email"}); 
        }
        res.json(sales);
    }catch(error){
        console.error("Error fetching sales by email:", error); 
        res.status(500).json({message: "Internal server error"});
    }
}

export const updateCouponUsedController = async (req, res) => {
     const { cupon, id } = req.body;
    if (cupon == null || !id) {
        return res.status(400).json({ message: "Faltan campos obligatorios " });
    }
    try { 
        const result = await updateSaleCouponService(id,cupon);
         res.status(201).json({ message: "Cupon actualizado"})}
    catch(error){
        if (error.message === "El cupon esta en este estado") {
            return res.status(409).json({ message: error.message });
        }
        console.log("Error fetching sales: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
    return result;
}
