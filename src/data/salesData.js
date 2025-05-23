import { getDbSupplies } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllSales(page, pageSize) {
    const db = getDbSupplies();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const sales = await db.collection("sales")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return sales;
    } else {
        const sales = await db.collection("sales").find().toArray();
        return sales;
    }
}

export async function findSaleById(id) {
    const db = getDbSupplies();
    if(!ObjectId.isValid(id)) {
        return null;
    }
    const _id = new ObjectId(id);
    const sale = await db.collection("sales").findOne({ _id });
    return sale;
}

export async function findSalesByCustomerEmail(email) {
  const db = getDbSupplies();
  return await db
    .collection("sales")
    .find({ "customer.email": email })
    .toArray();
}

/**
 * Actualiza el campo couponUsed de una venta por su id.
 * @param {string} id 
 * @param {boolean} couponUsed 
 * @returns {Object|null}
 */
export async function updateCouponUsedById(id, couponUsed) {
  if (!ObjectId.isValid(id)) return null;
  const db = getDbSupplies();
  const { modifiedCount } = await db
    .collection("sales")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { couponUsed: !!couponUsed } }
    );
  if (modifiedCount === 0) return null;
  return await db
    .collection("sales")
    .findOne({ _id: new ObjectId(id) });
}