import { getDbSupplies } from "./connection.js";
import { ObjectId } from "mongodb";

export async function findAllSales(page, pageSize) {
	const db = getDbSupplies();
	if (page && pageSize) {
		const skip = (page - 1) * pageSize;
		const sales = await db
			.collection("sales")
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
		return await db.collection("sales").findOne({ _id: new ObjectId(id) });
	} catch (error) {
		throw new Error("Invalid sale ID format");
	}
}

export async function findSalesByCustomerEmail(email) {
	const db = getDbSupplies();
	return await db
		.collection("sales")
		.find({ "customer.email": email })
		.toArray();
}

export async function updateSaleCouponUsedInDb(id, couponUsed) {
	const db = getDbSupplies();
	try {
		await db
			.collection("sales")
			.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { couponUsed: couponUsed } }
			);
	} catch (error) {
		throw new Error("Invalid sale ID format");
	}
}
