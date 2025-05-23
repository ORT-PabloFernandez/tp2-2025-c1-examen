import { findAllSales, findSaleById, findSalesWithTotal, findSalesByEmailUser, updateCouponUsage } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    return await findSaleById(id);
}

export const getSalesWithTotal = async () => {
    return await findSalesWithTotal();
}

export const getSalesByEmailUser = async (email, page, pageSize) => {
    return await findSalesByEmailUser(email, page, pageSize);
}

export const changeCouponUsage = async (saleId, couponUsed) =>{
    return await updateCouponUsage(saleId, couponUsed);
}