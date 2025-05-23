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
        // Sin paginación: trae todos los documentos
        const sales = await db.collection("sales").find().toArray();
        return sales;
    }
}

export async function findSaleById(id) {
    const db = getDbSupplies();
    const sale = await db.collection("sales").findOne({_id: new ObjectId(id)});
    console.log(sale);
    return sale;
}

export async function updateSaleCoupon(id) {
    const db = getDbSupplies();
    const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
    if (!sale) {
        return null;
    }
    const newCouponUsed = !sale.couponUsed;
    await db.collection("sales").updateOne(
        { _id: new ObjectId(id) },
        { $set: { couponUsed: newCouponUsed } }
    );
    return { couponUsed: newCouponUsed };
}

export async function findClientSales(email) {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find({ "customer.email": email}).toArray();
    return sales;
}

export async function findTopProducts(limit) {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find().sort({ items: -1 }).limit(limit).toArray();
    return sales;
}

export async function findTotal(page, pageSize) {
    const db = getDbSupplies();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const sales = await db.collection("sales")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        for (const sale of sales) {
            let total = 0;
            for (const item of sale.items) {
                total = total + item.price * item.quantity;
            }
            sale.total = total;
        }
        return sales;
    } else {
        // Sin paginación: trae todos los documentos
        const sales = await db.collection("sales").find().toArray();
        for (const sale of sales) {
            let total = 0;
            for (const item of sale.items) {
                total = total + item.price * item.quantity;
            }
            sale.total = total;
        }
        return sales;
    }
}


