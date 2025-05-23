import { findAllSales, findSaleById, findSalesByCustomerEmail, updateCouponUsedById } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    return await findSaleById(id);
}

export const getSalesWithTotal = async () => {
    const sales = await findAllSales();
    return sales.map(sale => {
        const total = sale.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        return {
            ...sale,
            total
        };
    });
};

export const getSalesWithTotalById = async (id) => {
    const sales = await findSaleById(id);
    if(!sales) {
        return null;
    }
    const total = sales.items.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);
    return {
        ...sales,
        total
    };
};


export const getSalesByCustomerEmail = async (email) => {
    return await findSalesByCustomerEmail(email);
}

export const updateSaleCouponUsed = async (id, couponUsed) => {
  return await updateCouponUsedById(id, couponUsed);
};