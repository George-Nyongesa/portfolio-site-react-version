require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config/db");

// Routes
const projectRoutes = require("./routes/projects.routes");
const experienceRoutes = require("./routes/experience.routes");
const educationRoutes = require("./routes/education.routes");
const heroRoutes = require("./routes/hero.routes");
const aboutRoutes = require("./routes/about.routes");
const contactRoutes = require("./routes/contact.routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

// CORS configuration to allow requests from frontend and deployed frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://george-nyongesa.netlify.app',
    'https://portfolio-backend.onrender.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect MongoDB
connectDB();

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Resume
app.get("/resume", (req, res) => {
  const resumePath = path.join(__dirname, "resume.pdf");
  res.download(resumePath, "George_Nyongesa_Resume.pdf", (err) => {
    if (err) {
      console.error("Failed to download resume:", err);
      res.status(500).send("Failed to download resume");
    }
  });
});

// Health check endpoint 
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));