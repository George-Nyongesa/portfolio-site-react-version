require("dotenv").config();
const mongoose = require("mongoose");

const testConnection = async () => {
  try {
    console.log("Connecting with URI:", process.env.MONGO_URI.replace(/:.*@/, ':****@'));
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB!");
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("📚 Collections in database:", collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log("👋 Disconnected");
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
};

testConnection();