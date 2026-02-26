require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");

const fixAdminPassword = async () => {
  try {
    await connectDB();
    
    const db = mongoose.connection.db;
    const collection = db.collection("admins");
    
    // Show current state
    const currentAdmin = await collection.findOne({ username: "george" });
    console.log("Current admin password type:", 
      currentAdmin.password.startsWith('$2a') ? "✅ Already hashed" : "❌ Plain text");
    
    // Generate proper hash
    console.log("\nGenerating proper password hash...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("@Tycoon254", salt);
    console.log("New hash:", hashedPassword);
    
    // Update the admin
    await collection.updateOne(
      { username: "george" },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        } 
      }
    );
    
    console.log("\n✅ Admin password fixed!");
    
    // Verify it works
    const updatedAdmin = await collection.findOne({ username: "george" });
    const verifyMatch = await bcrypt.compare("@Tycoon254", updatedAdmin.password);
    console.log("Verification test:", verifyMatch ? "✅ Password works!" : "❌ Still broken");
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

fixAdminPassword();