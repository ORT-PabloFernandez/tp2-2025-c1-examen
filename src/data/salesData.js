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
    return await db.collection("sales").findOne({ _id: new ObjectId(id) });
}

export async function findSalesWithTotal(page, pageSize) {
    const db = getDbSupplies();
    const pipeline = [
        {
            $addFields: {
                total: { $multiply: ["$price", "$quantity"] }
            }
        }
    ];

    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        pipeline.push({ $skip: skip }, { $limit: pageSize });
    }

    return await db.collection("sales").aggregate(pipeline).toArray();
}

export async function findSalesByCustomerEmail(email, page, pageSize) {
    const db = getDbSupplies();
    const query = { "customer.email": email };
    
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        return await db.collection("sales")
            .find(query)
            .skip(skip)
            .limit(pageSize)
            .toArray();
    }
    return await db.collection("sales").find(query).toArray();
}

export async function updateCouponUsed(id, couponUsed) {
    const db = getDbSupplies();
    const result = await db.collection("sales").updateOne(
        { _id: new ObjectId(id) },
        { $set: { couponUsed } }
    );
    return result.modifiedCount > 0;
}

export async function findTopProducts(limit = 5) {
    const db = getDbSupplies();
    return await db.collection("sales").aggregate([
        {
            $group: {
                _id: "$item",
                totalQuantity: { $sum: "$quantity" }
            }
        },
        {
            $sort: { totalQuantity: -1 }
        },
        {
            $limit: limit
        }
    ]).toArray();
}

export const getTopProducts = async (limit) => {
    return await findTopProducts(limit);
}

export const getTopSellingProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 5;
        const products = await findTopProducts(limit);
        res.json(products);
    } catch (error) {
        console.log("Error fetching top products: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
