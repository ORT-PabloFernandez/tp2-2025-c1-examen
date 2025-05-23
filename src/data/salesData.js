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
    return sale;
}

export async function findSalesWithTotal (){
    const db = getDbSupplies();
    const sales = await db.collection("sales").find().toArray();
    return sales.map(sale => {
        let total = 0;
        for (const item of sale.items) {
            const rawPrice = item.price?.$numberDecimal;
            const price = rawPrice? parseFloat(rawPrice):0;
            const quantity =parseFloat(item.quantity) ;
            total += price * quantity;
            
        }
        return{
            ...sale,
            total: parseFloat(total.toFixed(2))
        };

    });
}

export async function findSalesByEmailUser(email, page, pageSize) {
    const db = getDbSupplies();

    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const sales = await db.collection("sales")
            .find({"customer.email" : email})
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return sales;
    } else {
        // Sin paginación: trae todos los documentos
        const sales = await db.collection("sales").find({"customer.email" : email}).toArray();
        return sales;
    }
}

export async function updateCouponUsage(saleId, couponUsed) {
    const db = getDbSupplies();
    const result = await db.collection("sales").updateOne(
        {_id: new ObjectId(saleId)},
        {$set: {couponUsed: couponUsed}}
    );

    return result.modifiedCount > 0;
    
}