import { findAllSales, findSaleById, findClientSales, findTopProducts, updateSaleCoupon, findTotal } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    return await findSaleById(id);
}

export const searchClientSales = async (email) => {
    return await findClientSales(email);
}

export const searchTopProducts = async (limit) => {
    return await findTopProducts(limit);
}

export const updateCuponById = async (id) => {
    return await updateSaleCoupon(id);
};

export const searchTotal = async (page, pageSize) => {
    return await findTotal(page, pageSize);
}