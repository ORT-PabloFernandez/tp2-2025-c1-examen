import { findAllSales, getSaleById, addTotal, salesByEmail, updateCouponUsed } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleByIdService = async (id)=>{
    return await getSaleById(id);
}

export const addTotalSalesService = async () => {
    return await addTotal()
}

export const salesByEmailService = async(email)=>{
    return await salesByEmail(email);
}

export const updateCouponUsedService= async(id, coupon)=>{
    return await updateCouponUsed(id, coupon);
}
