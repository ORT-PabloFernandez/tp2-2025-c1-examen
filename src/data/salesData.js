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

export async function findSaleById(id){
    const db = getDbSupplies();
    const sale = await db.collection("sales").findOne({_id: new ObjectId(id) });
    return sale;
}

export async function findSalesWithTotalAmount(page, pageSize){
    const sales = await findAllSales(page, pageSize)
    
    for (const sale of sales){
        const items = sale["items"];
        for(const item of items){
            item["totalAmount"] = parseFloat(item.price) *  item["quantity"]
        }
    }

    return sales;

}

export async function findSaleByCustomerEmail(email){
    const db = getDbSupplies();
    const sales = await db.collection("sales").find({ "customer.email": email }).toArray();
    return sales;
}

export async function updateCouponValue(id, newValue){
    const db = getDbSupplies();
    
    try {
    const sales = await db.collection("sales").updateOne(
        { _id: new ObjectId(id) },
        { $set: { couponUsed: newValue } }
    )

    return true;
    } catch{

    }
}

export async function findTopProductsBySales(cantidad){
    const db = getDbSupplies();

    const topProducts = await db.collection("sales").aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.name",
            totalSold: { $sum: "$items.quantity" }
          }
        },
        { $sort: { totalSold: -1 } },
        { $limit: cantidad }
      ]).toArray();

    return topProducts;
}

