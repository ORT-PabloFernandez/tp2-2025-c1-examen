import { findAllSales, findSaleById, findAllSalesWithTotal, findSalesByCustomerEmail, updateSaleCouponUsed as updateSaleCouponUsedData } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    return await findSaleById(id);
}

export const getSalesWithTotal = async (page, pageSize) => {
    return await findAllSalesWithTotal(page, pageSize);
}

export const getSalesByCustomerEmail = async (email) => {
    return await findSalesByCustomerEmail(email);
}

export const updateSaleCouponUsed = async (id, couponUsed) => {
    return await updateSaleCouponUsedData(id, couponUsed);
}
