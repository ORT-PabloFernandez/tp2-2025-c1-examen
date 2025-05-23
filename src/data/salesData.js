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
    try {
        const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
        return sale;
    } catch (error) {
        if (error) {
            throw new Error('error en la busqueda de la venta');
        }
        throw error;
    }
}

export async function findAllSalesWithTotal(page, pageSize) {
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

    for (let sale of sales) {
        let total = 0;
        for (let item of sale.items) {
            const price = parseFloat(item.price);
            const quantity = parseInt(item.quantity);
            // chequeo el tipo de datos que esta llegando
            console.log(`Venta: ${sale._id} | Item: ${item.name} | Precio: ${price} | Cantidad: ${quantity} | Subtotal: ${price * quantity}`);
            total += price * quantity;
        }
        console.log(`Venta: ${sale._id} | Total calculado: ${total}`);
        sale.total = total.toFixed(2);
    }
    
    return sales;
}

export async function findSalesByCustomerEmail(email) {
    const db = getDbSupplies();
    try {
        const sales = await db.collection("sales")
            .find({ "customer.email": email })
            .toArray();
        return sales;
    } catch (error) {
        throw new Error('error en la busqueda de ventas por email');
    }
}

export async function updateSaleCouponUsed(id, couponUsed) {
    const db = getDbSupplies();
    try {
        const result = await db.collection("sales").updateOne(
            { _id: new ObjectId(id) },
            { $set: { couponUsed: couponUsed } }
        );
        
        if (result.matchedCount === 0) {
            return null;
        }
        
        return await findSaleById(id);
    } catch (error) {
        throw new Error('error al actualizar el uso de cupón');
    }
}
