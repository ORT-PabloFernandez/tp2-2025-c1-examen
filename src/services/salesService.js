import { findAllSales, findSaleById, findSalesWithTotal, findSalesByCustomerEmail, updateCouponUsed, findTopProducts } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    const sale = await findSaleById(id);
    if (!sale) {
        throw new Error("Sale not found");
    }
    return sale;
}

export const getSalesWithTotal = async (page, pageSize) => {
    return await findSalesWithTotal(page, pageSize);
}

export const getSalesByCustomerEmail = async (email, page, pageSize) => {
    return await findSalesByCustomerEmail(email, page, pageSize);
}

export const updateSaleCouponUsed = async (id, couponUsed) => {
    const updated = await updateCouponUsed(id, couponUsed);
    if (!updated) {
        throw new Error("Sale not found or not updated");
    }
    return { success: true };
}

export const getTopProducts = async (limit = 5) => {
    const db = getDbSupplies();
    return await db.collection("sales").aggregate([
        {
            $group: {
                _id: "$item",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $sort: { totalQuantity: -1 }
        },
        {
            $limit: limit
        }
    ]).toArray();
}
