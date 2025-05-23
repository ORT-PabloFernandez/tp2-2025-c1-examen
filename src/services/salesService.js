import { findAllSales, findAllSalesTotal, findSaleById, findSalesByUserEmail, updateCouponById } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const getSaleById = async (id) => {
    return await findSaleById(id);
};

export const getSalesWithTotal = async () => {
    const sales = await findAllSalesTotal();

    const salesWithTotal = sales.map(sale => {
        const total = sale.items.reduce((acc, item) =>
            acc + parseFloat(parseFloat(item.price.toString())) * item.quantity,
        0);

        return { ...sale, 
            total: `$${total.toFixed(2)}` };
    });

    return salesWithTotal;
};

export const getSalesByEmail = async (email) => {
    const sales = await findSalesByUserEmail(email);

    return sales.map(sale => {
        const total = sale.items.reduce((acc, item) =>
            acc + parseFloat(item.price.toString()) * item.quantity,
        0);

        return {
            ...sale,
            total: `$${total.toFixed(2)}`
        };
    });
};

export const updateCouponUsed = async (id, value) => {
    return await updateCouponById(id, value);
};

export const getTopSellingProducts = async (limit = 5) => {
    const sales = await findAllSales();
    const productMap = {};

    sales.forEach(sale => {
        sale.items.forEach(item => {
            const name = item.name;
            const quantity = item.quantity;

            if (!productMap[name]) {
                productMap[name] = 0;
            }

            productMap[name] += quantity;
        });
    });

    const productosOrdenados = Object.keys(productMap).map(nombre => {
        return { product: nombre, totalSold: productMap[nombre] };
    });

    productosOrdenados.sort((a, b) => b.totalSold - a.totalSold);

    return productosOrdenados.slice(0, limit);
};





