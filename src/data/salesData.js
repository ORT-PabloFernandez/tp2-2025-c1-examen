import { ObjectId } from "mongodb";
import { getDbSupplies } from "./connection.js";

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

//OK
export async function findSaleById(id) {
  const db = getDbSupplies();
  const sale = await db.collection("sales").findOne({ _id: new ObjectId(id) });
  if (!sale) {
    throw new Error("Venta no entontrada");
  }
  return sale;
}

//TODO
export async function findSalesTotal() {
  const db = getDbSupplies();
  const sales = await db
    .collection("sales")
    .find()
    .project({ "items.name": 1, "items.price": 1, "items.quantity": 1 })
    .toArray();

  const total = sales.forEach((sale) => {
    let precio;
    let cantidad;
    sale.items.forEach((item) => {
      precio += item.price;
      cantidad += item.quantity;
    });
    return {
      ...sale,
      precioTotal: precio * cantidad,
    };
  });

  return total;
}

//OK
export async function findVentasCliente(email) {
  const db = getDbSupplies();
  const sales = await db
    .collection("sales")
    .find({ "customer.email": email })
    .toArray();
  return sales;
}

//TODO
export async function updateCoupon(id) {
  const db = getDbSupplies();
  const sale = await db
    .collection("sales")
    .findOne(
      { _id: new ObjectId(id) },
      { projection: { "customer.email": 1, couponUsed: 1 } }
    );
  if (!sale) {
    throw new Error("Venta no encontrada");
  }
  if (sale.couponUsed) {
    sale.couponUsed = false;
  } else {
    sale.couponUsed = true;
  }
  return sale;
}

//TODO
export async function ranking(cantidad) {
  const db = getDbSupplies();
  const sales = await db.collection("sales").find().toArray();
}

// NOTA: Me faltó práctica con las lógicas de acumulación. Tampoco me salió el put del updateCoupon.
