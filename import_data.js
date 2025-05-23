// Selecciona la base de datos
db = db.getSiblingDB('sample_supplies');

// Productos disponibles
const items = [
  { name: "notepad", tags: ["office", "writing", "school"], basePrice: 35.29 },
  { name: "pens", tags: ["writing", "office", "school", "stationary"], basePrice: 56.12 },
  { name: "envelopes", tags: ["stationary", "office", "general"], basePrice: 19.95 },
  { name: "binder", tags: ["school", "general", "organization"], basePrice: 14.16 },
  { name: "paper", tags: ["office", "writing", "school"], basePrice: 25.99 },
  { name: "desk lamp", tags: ["office", "lighting", "general"], basePrice: 45.50 },
  { name: "stapler", tags: ["office", "tools"], basePrice: 12.99 },
  { name: "scissors", tags: ["office", "tools", "school"], basePrice: 15.99 }
];

// Ubicaciones posibles
const locations = ["Denver", "Seattle", "New York", "London", "Paris"];

// Arreglo donde se almacenarán las ventas
const sales = [];

// Generación de 5000 ventas
for (let i = 0; i < 5000; i++) {
  const numItems = Math.floor(Math.random() * 4) + 1;
  const saleItems = [];

  for (let j = 0; j < numItems; j++) {
    const item = items[Math.floor(Math.random() * items.length)];
    const quantity = Math.floor(Math.random() * 10) + 1;
    const priceVariation = (Math.random() * 0.2) - 0.1;

    saleItems.push({
      name: item.name,
      tags: item.tags,
      price: NumberDecimal((item.basePrice * (1 + priceVariation)).toFixed(2)),
      quantity: quantity
    });
  }

  sales.push({
    saleDate: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)), // Últimos 90 días
    items: saleItems,
    storeLocation: locations[Math.floor(Math.random() * locations.length)],
    customer: {
      gender: Math.random() > 0.5 ? "M" : "F",
      age: Math.floor(Math.random() * 50) + 20,
      email: `customer${i}@example.com`,
      satisfaction: Math.floor(Math.random() * 5) + 1
    },
    couponUsed: Math.random() > 0.7,
    purchaseMethod: Math.random() > 0.5 ? "Online" : "In store"
  });
}

// Insertar ventas
db.sales.insertMany(sales);

// Crear índices para mejorar consultas
db.sales.createIndex({ "customer.email": 1 });
db.sales.createIndex({ saleDate: 1 });
db.sales.createIndex({ "items.name": 1 });

print("✅ Se insertaron 5000 ventas correctamente.");
