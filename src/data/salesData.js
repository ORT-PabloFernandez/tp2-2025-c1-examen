import { ObjectId } from "mongodb";
import { getDbSupplies } from "./connection.js";

export async function findAllSales(page, pageSize) {
  const db = getDbSupplies();
  if (page && pageSize) {
    const skip = (page - 1) * pageSize;
    const sales = await db
      .collection("sales")
      .find()
      .skip(skip)
      .limit(pageSize)
      .toArray();
    return sales;
  } else {
    // Sin paginación: trae todos los documentos
    const sales = await db.collection("sales").find().toArray();
    return sales;
  }
}

export async function findSalesById(id) {
  const db = getDbSupplies();
  const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
  console.log(sale);
  return sale;
}

export async function addTotalToSales() {
  const db = getDbSupplies();
  const sales = await db.collection("sales").find().toArray();

  return sales.map((sale) => {
    const total = Array.isArray(sale.items)
      ? sale.items.reduce((sum, item) => {
          const price = parseFloat(
            item.price?.$numberDecimal || item.price || 0
          );
          const quantity = item.quantity || 0;
          return sum + price * quantity;
        }, 0)
      : 0;

    return {
      ...sale,
      total: parseFloat(total.toFixed(2)),
    };
  });
}

export async function findSalesByCustomer(email) {
  const db = getDbSupplies();
  const sales = await db
    .collection("sales")
    .find({
      "customer.email": email,
    })
    .toArray();
  return sales;
}

export async function updateCoupon(id, couponUsed) {
  const db = getDbSupplies();
  const update = await db
    .collection("sales")
    .updateOne({ _id: new ObjectId(id) }, { $set: { couponUsed } });
  return update;
}
