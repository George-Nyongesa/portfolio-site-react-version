// Save as verify-admin.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const verifyAdmin = async () => {
  try {
    await connectDB();
    
    // Direct database access to check admins
    const db = mongoose.connection.db;
    const admins = await db.collection("admins").find().toArray();
    
    console.log("📊 Total admins in database:", admins.length);
    console.log("\n👤 Admin users:");
    admins.forEach((admin, index) => {
      console.log(`   ${index + 1}. Username: ${admin.username}`);
      console.log(`      ID: ${admin._id}`);
      console.log(`      Password exists: ${admin.password ? '✅' : '❌'}`);
      console.log(`      Created: ${admin.createdAt || 'N/A'}`);
    });
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

verifyAdmin();