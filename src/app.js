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
            { method: "GET", path: "/api/sales/", description: "Lista todas las ventas, soporta paginado"},
            { method: "GET", path: "/api/sales/:id", description: "Busca una venta por su id"},
            { method: "GET", path: "/api/sales/total/", description: "Lista todas las ventas con una propiedad total (monto total de la venda)"},
            { method: "GET", path: "/api/sales/customer/:email", description: "Busca una venta por el mail del cliente"},
            { method: "PUT", path: "/api/sales/:id/changeCoupon", description: "Cambia la propiedad couponUsed"}
        ]
    });
});

export default app;