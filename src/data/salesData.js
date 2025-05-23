import { ObjectId } from "mongodb";
import { getDbSupplies } from "./connection.js";

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
    console.log(sale)
    return sale;
}

export async function findSalesByCustomerEmail(email) {

    const db = getDbSupplies()
    const sales = await db.collection("sales").find({"customer.email": email}).toArray()
    return sales;
}

export async function updateCouponInSaleById(id) {
    const db = getDbSupplies()
    const sale = await db.collection("sales").findOne({_id: new ObjectId(id)})
    
    const updatedSale = db.collection("sales").findOneAndReplace({_id: new ObjectId(id)}, { ...sale, couponUsed: !sale.couponUsed })
    return updatedSale;
}