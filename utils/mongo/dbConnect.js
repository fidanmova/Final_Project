import mongoose from "mongoose";

const CONNECTION_URL = process.env.CONNECTION_URL;

if (!CONNECTION_URL) {
    throw new Error(
        "Please define the CONNECTION_URL environment variable inside .env.local"
    );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    const db = await mongoose.connect(CONNECTION_URL, () => {
        console.log("connected to database");
    });

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
