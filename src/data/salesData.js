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

//ventas por id
export async function findSaleById(id) {
    const db = getDbSupplies();
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de venta inválido");
    }
    const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
    return sale;
}

//obtener todas las ventas con total
export async function findAllSalesTotal() {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find().toArray();
    return sales;
}

//venta por email de usuario
export async function findSalesByUserEmail(email) {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find({ "customer.email": email }).toArray();
    return sales;
}

//actualiza valor de cupon
export async function updateCouponById(id, value) {
    const db = getDbSupplies();
    return await db.collection("sales").updateOne(
        { _id: new ObjectId(id) },
        { $set: { couponUsed: value } }
    );
}

