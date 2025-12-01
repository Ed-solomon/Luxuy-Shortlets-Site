// ==========================================
// Import Modules
// ==========================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// ==========================================
// Initialize App
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000; // Use Render's dynamic port if available

// ==========================================
// Middleware
// ==========================================
// Parse JSON from frontend
app.use(express.json());

// Serve all static files inside public
app.use(express.static(path.join(__dirname, "public")));

// ==========================================
// Routes - Pages
// ==========================================

// Landing page (homepage)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing-page", "index.html"));
});

// Lagos Airbnb page
app.get("/lagos-airbnb", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lagos-airbnb", "index.html"));
});

// SPA Fallback for all other routes (Express v5 compatible)
app.get(/.*/, (req, res) => {
  // Default to homepage if route not matched
  res.sendFile(path.join(__dirname, "public", "landing-page", "index.html"));
});

// ==========================================
// Contact Form Submission (Backend)
// ==========================================

// Path to JSON file where form submissions are stored
const dataFilePath = path.join(
  __dirname,
  "public",
  "lagos-airbnb",
  "data",
  "user-info.json"
);

// Ensure JSON file exists
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
}

// API endpoint to handle contact form submissions
app.post("/api/contact", (req, res) => {
  const newEntry = req.body;
  newEntry.createdAt = new Date().toISOString();

  try {
    const json = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    json.push(newEntry);
    fs.writeFileSync(dataFilePath, JSON.stringify(json, null, 2));
    return res.json({ success: true, message: "Saved successfully" });
  } catch (err) {
    console.error("❌ Error saving form data:", err);
    return res.status(500).json({ success: false });
  }
});

// ==========================================
// 404 Handler
// ==========================================
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// ==========================================
// 500 Handler
// ==========================================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).send("500 - Internal Server Error");
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
