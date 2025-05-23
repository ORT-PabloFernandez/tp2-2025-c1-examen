import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

let client;
let db;

export async function connectToDatabase(){
    if(!client){
        try {
            client = new MongoClient(uri);
            await client.connect();
            db = client.db("sample_supplies");
            console.log("✅ Conexión a MongoDB establecida");
        } catch (error) {
            console.error("❌  Error conectando a MongoDB", error.message);
            throw error;
        }
    }
    return db;
}

export function getDb() {
    if(!db) {
        throw new Error(
            "Debes conectar a la base de datos primero usando connectToDatabase()"
        );
    }
    return db;
}

// Nueva función para acceder a la base sample_supplies
export function getDbSupplies() {
    if(!client) {
        throw new Error(
            "Debes conectar a la base de datos primero usando connectToDatabase()"
        );
    }
    return client.db("sample_supplies");
}