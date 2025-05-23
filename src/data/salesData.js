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

// Obtener una venta en particular por su ID
export async function getSaleById(id) {
    const db = getDbSupplies();
    const sale = await db.collection("sales")
        .findOne({ _id: new ObjectId(id) });
    return sale;
}

export async function addTotal() {
    const db = getDbSupplies();
    const sales = await db.collection("sales")
        .aggregate([
            {
                $addFields: { total: { $sum: { $map: { input: "$items", as: "item", in: { $multiply: [{ $convert: { input: "$$item.price", to: "decimal", onError: 0 } }, "$$item.quantity"] } } } } }
            }
        ])
        .toArray();

    return sales;
}

// Obtener venta por email de cliente
export async function salesByEmail(email) {
    const db = getDbSupplies();
    const sales = await db.collection("sales")
        .find({"customer.email": email })
        .toArray();
    return sales;
}

//cambiar cupon de una venta

export async function updateCouponUsed(id, coupon) {
    const db = getDbSupplies();
    const query = { _id: new ObjectId(id) };
    const newValues = {
        $set: {
            couponUsed: coupon
        },
    };

    const result = await db
        .collection("sales")
        .updateOne(query, newValues);
    return result;
}