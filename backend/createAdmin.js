require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const connectDB = require("./config/db");

connectDB();

const createAdmin = async () => {
  try {
    const admin = new Admin({
      username: "george",
      password: "@Tycoon254",
    });
    await admin.save();
    console.log("Admin created!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
