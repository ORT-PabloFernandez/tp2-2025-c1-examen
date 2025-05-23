import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoute.js";

import salesRoutes from "./routes/salesRouter.js";
import cors from "cors";

const app = express();

// Middlewars
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);

app.use("/api/sales", salesRoutes);

// Ruta base
app.get("/", (req, res) => {
    res.json({
        message: "API TP2 - Examen 2025 C1",
        endpoints: [
            { method: "GET", path: "/api/sales/:id", description: "Obtiene una venta por ID" },
            { method: "GET", path: "/api/sales/total", description: "Obtiene todas las ventas calculando el totalAmount de cada una" },
            { method: "GET", path: "/api/sales/customer/:email", description: "Obtiene todas las ventas de un cliente en particular" },
            { method: "GET", path: "/api/sales/top-products", description: "Obtiene los n productos mas vendidos" },
            { method: "POST", path: "/api/sales/customer/updateCoupon/:id", description: "Actualiza el valor del campo 'couponUsed' de un cliente en particular" },
        ]
    });
});

export default app;