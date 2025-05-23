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

export const getSalesById = async (id) => {
    const db = getDbSupplies();
    const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
    return sale;
}

export const findAllSalesWithTotal= async () => {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find().toArray();

    return sales.map(sale => ({
        ...sale,
        total: sale.price * sale.quantity
    }));
}

export const findSalesByCustomerEmail = async (email) => {
    const db = getDbSupplies();

    const sales = await db.collection("sales").find({
        "customer.email": { $regex: new RegExp(`^${email}$`, 'i') }
    }).toArray();

    return sales;
};

export const updateCouponUsed = async (id, couponUsed) => {
    const db = getDbSupplies();

    const result = await db.collection("sales").updateOne(
        { _id: new ObjectId(id) },
        { $set: { couponUsed: couponUsed } }
    );

    return result.modifiedCount;
};

export const getTopSoldProducts = async (limit) => {
    const db = getDbSupplies();

    const result = await db.collection("sales").aggregate([
        { $unwind: "$items" }, 
        {
            $group: {
                _id: "$items.name",
                totalQuantity: { $sum: "$items.quantity" }
            }
        },
        { $sort: { totalQuantity: -1 } }, 
        { $limit: limit },
        {
            $project: {
                _id: 0,
                product: "$_id",
                totalQuantity: 1
            }
        }
    ]).toArray();

    return result;
};