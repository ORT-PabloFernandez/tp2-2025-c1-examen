import {
  findAllSales,
  findSalesById,
  addTotalToSales,
  findSalesByCustomer,
  updateCoupon,
} from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
  return await findAllSales(page, pageSize);
};

export async function getSaleById(id) {
  return await findSalesById(id);
}

export async function salesWithTotal() {
  return await addTotalToSales();
}

export async function getSalesByEmail(email) {
  return await findSalesByCustomer(email);
}

export async function updateStateCoupon(id, couponUsed) {
  return await updateCoupon(id, couponUsed);
}
