const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Debug version - let's see what's happening
AdminSchema.pre("save", function(next) {
  console.log("1. Pre-save middleware triggered");
  console.log("2. Type of next:", typeof next);
  console.log("3. Is next a function?", typeof next === 'function');
  
  // If next is not a function, something is seriously wrong
  if (typeof next !== 'function') {
    console.error("ERROR: next is not a function!");
    return;
  }
  
  // Continue with the hashing logic
  if (!this.isModified("password")) {
    console.log("4. Password not modified, skipping hash");
    return next();
  }
  
  console.log("5. Password is modified, hashing...");
  
  // Use callback pattern instead of async/await for compatibility
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error("6. Salt generation error:", err);
      return next(err);
    }
    
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        console.error("7. Hashing error:", err);
        return next(err);
      }
      
      console.log("8. Password hashed successfully");
      this.password = hash;
      next();
    });
  });
});

// Compare password method
AdminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Admin", AdminSchema);