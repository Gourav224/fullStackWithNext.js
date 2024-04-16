import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI! || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to database successfully");
    console.log(db);
    console.log(db.connection);
  } catch (error: any) {
    console.log(error);
    console.log("Error connecting to database");
    process.exit(1);
  }
}
export default dbConnect;
