import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function findAllUsers() {
    const db = getDb();
    const users = await db.collection("users").find().toArray();
    console.log(users);
    return users;
}

export async function findUserById(id) {
    const db = getDb();
    const user = await db.collection("users").findOne({_id: new ObjectId(id)});
    console.log(user);
    return user;
}

// Busca un usuario por email y compara el password usando bcrypt
export async function findByCredentials(email, password) {
    const db = getDb();
    const user = await db.collection("users").findOne({ email });
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    return user;
}

// Registra un nuevo usuario: hashea el password y lo guarda en la base de datos
export async function registerUser({ username, email, password }) {
    const db = getDb();
    // Verificar si el usuario ya existe
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
        throw new Error("El email ya está registrado");
    }
    // Hashear el password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        username,
        email,
        password: hashedPassword
    };
    const result = await db.collection("users").insertOne(newUser);
    return result;
}

