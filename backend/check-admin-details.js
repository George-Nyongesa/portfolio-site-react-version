require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

const checkAdminDetails = async () => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const admins = await db.collection("admins").find().toArray();
    
    console.log("📊 Total admins:", admins.length);
    
    for (const admin of admins) {
      console.log("\n👤 Admin found:");
      console.log("   Username:", admin.username);
      console.log("   Password hash:", admin.password.substring(0, 20) + "...");
      
      // Test the password
      const testPassword = "@Tycoon254";
      const isMatch = await bcrypt.compare(testPassword, admin.password);
      console.log("   Password '@Tycoon254' matches:", isMatch ? "✅ YES" : "❌ NO");
      
      // Also try without the @ symbol just in case
      const testWithoutAt = "Tycoon254";
      const isMatchWithoutAt = await bcrypt.compare(testWithoutAt, admin.password);
      console.log("   Password 'Tycoon254' matches:", isMatchWithoutAt ? "✅ YES" : "❌ NO");
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

checkAdminDetails();