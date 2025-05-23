import {
  findAllSales,
  findSaleById,
  findSalesTotal,
  findVentasCliente,
  updateCoupon,
} from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
  return await findAllSales(page, pageSize);
};

export const getSaleById = async (id) => {
  return await findSaleById(id);
};

export const getSalesTotal = async () => {
  return await findSalesTotal();
};

export const getVentasCliente = async (email) => {
  return await findVentasCliente(email);
};

export const getUpdateCoupon = async (id) => {
  return await updateCoupon(id);
};
