import {
	getSales,
	getSale,
	getSalesWithTotal,
	getCustomerSalesByEmail,
	updateSaleCouponUsed,
	getTopProductsWithLimit,
} from "../services/salesService.js";

export const getAllSales = async (req, res) => {
	try {
		const page = req.query.page ? parseInt(req.query.page) : undefined;
		const pageSize = req.query.pageSize
			? parseInt(req.query.pageSize)
			: undefined;

		const sales = await getSales(page, pageSize);

		res.json(sales);
	} catch (error) {
		console.log("Error fetching sales: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getSaleById = async (req, res) => {
	try {
		const id = req.params.id;
		const sale = await getSale(id);

		if (!sale) {
			return res.status(404).json({ message: "Sale not found" });
		}

		res.json(sale);
	} catch (error) {
		console.log("Error fetching sale by ID: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getAllSalesWithTotal = async (req, res) => {
	try {
		const sales = await getSalesWithTotal();
		res.json(sales);
	} catch (error) {
		console.log("Error fetching sales with total: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getAllCustomerSalesByEmail = async (req, res) => {
	try {
		const email = req.params.email;
		if (!email) {
			return res.status(400).json({ message: "Email is required" });
		}

		const sales = await getCustomerSalesByEmail(email);
		res.json(sales);
	} catch (error) {
		console.log("Error fetching customer sales by email: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const updateSaleCouponUsedController = async (req, res) => {
	try {
		const id = req.params.id;
		const { couponUsed } = req.body;

		if (typeof couponUsed !== "boolean") {
			return res
				.status(400)
				.json({ message: "couponUsed must be a boolean value" });
		}

		const updatedSale = await updateSaleCouponUsed(id, couponUsed);
		res.json(updatedSale);
	} catch (error) {
		if (error.message === "Sale not found") {
			return res.status(404).json({ message: error.message });
		}
		if (error.message === "Invalid sale ID format") {
			return res.status(400).json({ message: error.message });
		}
		console.log("Error updating sale coupon used: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getTopProducts = async (req, res) => {
	try {
		const limit = req.query.limit;
		if (!limit || isNaN(limit) || limit <= 0) {
			return res.status(400).json({ message: "Invalid limit value" });
		}

		const topProducts = await getTopProductsWithLimit(limit);
		res.json(topProducts);
	} catch (error) {
		console.log("Error fetching top products: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
