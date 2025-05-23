import jwt from "jsonwebtoken";

const payload = {
  email: "se@nacwev.an"
};

const secret = process.env.JWT_SECRET || "supersecreto123";

const token = jwt.sign(payload, secret, { expiresIn: "1h" });

console.log("Token JWT válido:\n", token);