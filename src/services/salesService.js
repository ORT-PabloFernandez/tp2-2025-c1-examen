import { findAllSales, findSaleById, findSalesWithTotalAmount, findSaleByCustomerEmail, updateCouponValue, findTopProductsBySales } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSalesById = async (id) => {
    return await findSaleById(id);
}

export const getSalesWithTotalAmount = async (page, pageSize) => {
    return await findSalesWithTotalAmount(page, pageSize);
}

export const getSalesByCustomerEmail = async (email) => {
    return await findSaleByCustomerEmail(email);
}

export const postUpdateCouponValue = async (id, newValue) => {
    return await updateCouponValue(id, newValue);
}

export const getTopProductBySales = async (cantidad) => {
    return await findTopProductsBySales(cantidad);
}