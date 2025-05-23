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
    const sale = await db.collection("sales").findOne( { _id: new ObjectId(id) } )

    return sale
}

export async function totalSales() {
    const db = getDbSupplies();
    const sales = await db.collection("sales").find().toArray();

    for (const sale of sales) {
        let total = 0;

        for (const item of sale.items) {
            const price = parseFloat(item.price.toString()); 
            const quantity = item.quantity;

            total += price * quantity;
        }

        sale.total = parseFloat(total.toFixed(2)); 
    }

    return sales;
}


export async function filterSaleClientByEmail( email ) {
    const db = getDbSupplies();

    const client = db.collection("sales").find({
        "customer.email": email
    }).toArray();

    return client
}

export async function putCouponUsed( saleId , newValue ) {
    const db = getDbSupplies();
    const result = await db.collection("sales").updateOne(
        { _id: new ObjectId( saleId )},
        { $set: { couponUsed: newValue }}
    )

    return result
}

export async function rankingTopProducts( limit ) {
    const db = getDbSupplies();
    
    const result = db.collection("sales").aggregate([
        {$unwind: "$items"},
        {
            $group: {
                _id: "$items.name",
                totalSold: { $sum: "$items.quantity"}
            }
        },
        { $sort: { totalSold: -1 }},
        { $limit: limit }
    ]).toArray();

    return result;
}