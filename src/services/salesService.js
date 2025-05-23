import {
	findAllSales,
	findSaleById,
	findSalesByCustomerEmail,
	updateSaleCouponUsedInDb,
} from "../data/salesData.js";

export const getSales = async (page, pageSize) => {
	return await findAllSales(page, pageSize);
};

export const getSale = async (id) => {
	if (!id) {
		throw new Error("ID is required");
	}

	return await findSaleById(id);
};

export const getSalesWithTotal = async () => {
	const sales = await findAllSales();
	return sales.map((sale) => {
		let total = 0;

		sale.items.forEach((item) => {
			let price;

			// Esto es porque al traer los objetos de Mongo, el precio viene como objeto y a veces como número
			// ME VOLVIÓ LOCO ESTO!
			if (typeof item.price === "object" && item.price.$numberDecimal) {
				price = parseFloat(item.price.$numberDecimal);
			} else {
				price = parseFloat(item.price.toString());
			}

			const subtotal = price * item.quantity;
			total += subtotal;
		});

		return { ...sale, total };
	});
};

export const getCustomerSalesByEmail = async (email) => {
	const sales = await findSalesByCustomerEmail(email);

	if (!sales || sales.length === 0) {
		throw new Error("No sales found for this customer");
	}

	return sales;
};

export const updateSaleCouponUsed = async (id, couponUsed) => {
	if (!id) {
		throw new Error("ID is required");
	}

	const existingSale = await getSale(id);
	if (!existingSale) {
		throw new Error("Sale not found");
	}

	await updateSaleCouponUsedInDb(id, couponUsed);

	return findSaleById(id);
};

export const getTopProductsWithLimit = async (limit) => {
	const sales = await findAllSales();
	const productQuantities = {};

	sales.forEach((sale) => {
		sale.items.forEach((item) => {
			productQuantities[item.name] =
				(productQuantities[item.name] || 0) + item.quantity;
		});
	});

	const sortedProducts = Object.entries(productQuantities)
		.sort(([, a], [, b]) => b - a)
		.slice(0, limit)
		.map(([name, quantity]) => ({ name, quantity }));

	return sortedProducts;
};
