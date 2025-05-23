import { ObjectId } from "mongodb";
import { getDb, getDbSupplies } from "./connection.js";
import bcrypt from "bcrypt";

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
export async function findSaleByID(id){
    const db = getDbSupplies();
    const sale= await db.collection("sales").findOne({_id: new ObjectId(id)});
    console.log(sale);
    return sale;
}
export async function findTotal(page, pageSize) {
    const db = getDbSupplies();
    let sales;

    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        sales = await db.collection("sales")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
    } else {
        sales = await db.collection("sales").find().toArray();
    }

    const salesWithTotal = sales.map(sale => {
        
        const total = sale.items.reduce((sum, item) => {
            const price = parseFloat(item.price );
            const quantity = item.quantity ;
            return sum + price * quantity;
        }, 0) ; 

        return {
            ...sale,
            total: parseFloat(total.toFixed(2)) 
        };
    });

    return salesWithTotal;
}
export async function findSaleByEmail(email){
    const db = getDbSupplies();
    const sales = await db.collection("sales").find({'customer.email': email}).toArray();
    console.log(sales);
    return sales;
}
export async function updateCouponUsed(id, cupon) {
    const db = getDbSupplies();
    
    const sale= await db.collection("sales").findOne({_id: new ObjectId(id)});
        if(sale.couponUsed ==cupon){
            throw new Error ("El cupon esta en este estado")
        }else{
            const result = await db.collection("sales").updateOne(
        { _id: new ObjectId(id) },
        { $set: { couponUsed: cupon } }
    );
        }
        
            


}
