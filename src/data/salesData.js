import { getDb, getDbSupplies } from "./connection.js";
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
        // Sin paginación: trae todos los documentos
        const sales = await db.collection("sales").find().toArray();
        return sales;
    }
}

export async function findSaleById(id) {
    const db = getDbSupplies();
    const sale = await db.collection("sales").findOne({_id: new ObjectId(id)});
    return sale;
}

export async function findSaleByCustomerEmail(email) {
    const db = getDbSupplies();
    return await db.collection("sales").find({"customer.email": email }).toArray();
}

export async function updateCoupon(id, couponUsed) {
    const db = getDbSupplies();
    const result = await db.collection("sales").findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { couponUsed: couponUsed } },
    );
    return result;
}