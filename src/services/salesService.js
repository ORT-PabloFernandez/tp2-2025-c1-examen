import { findAllSales, findSaleById, totalSales, filterSaleClientByEmail, putCouponUsed, rankingTopProducts } from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
    return await findAllSales(page, pageSize);
}

export const saleByid = async ( id ) => await findSaleById( id );

export const getSaleTotals = async () => await totalSales();

export const getSalesByClientEmail = async ( email ) => await filterSaleClientByEmail( email );

export const setUpdateCouponUsed = async ( saleId, newValue ) => await putCouponUsed( saleId, newValue);

export const topProducts = async ( limit ) => await rankingTopProducts( limit )