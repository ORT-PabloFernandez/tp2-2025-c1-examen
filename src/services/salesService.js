import { findAllSales, findSaleById, findSaleByCustomerEmail, updateCoupon } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    return await findSaleById(id);
}

export const getSalesWithTotal = async (page, pageSize) => {
    const sales = await findAllSales(page, pageSize);

    return sales.map(sale => ({
        ...sale,
        total: sale.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }));
}

export const getSaleByCustomerEmail = async (email) => {
    return await findSaleByCustomerEmail(email); 
}

export const updateCouponService = async (id, couponUsed) => {
    return await updateCoupon(id, couponUsed);
}