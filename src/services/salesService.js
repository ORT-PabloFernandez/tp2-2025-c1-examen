import { findAllSales, getSalesById, findAllSalesWithTotal, findSalesByCustomerEmail, updateCouponUsed, getTopSoldProducts} from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => { 
    return await getSalesById(id);
}

export async function getSalesWithTotal() {
    return await findAllSalesWithTotal();
}

export const getSalesByCustomerEmail = async (email) => {
    return await findSalesByCustomerEmail(email);
};

export const changeCouponStatus = async (id, couponUsed) => {
    return await updateCouponUsed(id, couponUsed);
};

export const getTopProducts = async (limit) => {
    return await getTopSoldProducts(limit);
};