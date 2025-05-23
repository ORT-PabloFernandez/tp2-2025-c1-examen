import { findAllSales, findSaleById, findSalesByCustomerEmail, updateCouponInSaleById } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export async function getSaleById(id) {
    return await findSaleById(id);
}

export async function getSalesByCustomerEmail(email) {
    return await findSalesByCustomerEmail(email);
}

export async function setCouponInSale(id) {
    return await updateCouponInSaleById(id);
}