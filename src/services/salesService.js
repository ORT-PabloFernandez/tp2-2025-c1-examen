import { findAllSales, findSaleByID, findTotal, findSaleByEmail,updateCouponUsed } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}
export async function getSaleById(id){
    return await findSaleByID(id);
}
export const getTotal = async (page, pageSize) => {
    return await findTotal(page, pageSize);
}
export async function getSaleByEmail(Email){
    return await findSaleByEmail(Email);
}
export const updateSaleCouponService = async (id, cupon) => {
    try{
        return await updateCouponUsed(id, cupon);

    }catch(error){
         if (error.message === "El cupon esta en este estado") {
        throw error;
        }
    }
};