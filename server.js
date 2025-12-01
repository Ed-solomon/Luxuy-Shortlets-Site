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
const PORT = process.env.PORT || 3000;

// ==========================================
// Middleware
// ==========================================
app.use(express.json());

// ==========================================
// Serve Static Files (MUST come BEFORE routes)
// ==========================================

// Landing page static files
app.use(
  "/landing-page",
  express.static(path.join(__dirname, "public", "landing-page"))
);

// Lagos-Airbnb static files
app.use(
  "/lagos-airbnb",
  express.static(path.join(__dirname, "public", "lagos-airbnb"))
);

// Assets
app.use(
  "/assets",
  express.static(path.join(__dirname, "public", "assets"))
);

// ==========================================
// API Routes (MUST come BEFORE page routes)
// ==========================================

const dataFilePath = path.join(
  __dirname,
  "public",
  "lagos-airbnb",
  "data",
  "user-info.json"
);

// Ensure JSON file exists
if (!fs.existsSync(dataFilePath)) {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
}

// API endpoint for contact form
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
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ==========================================
// Page Routes (MUST come BEFORE SPA fallback)
// ==========================================

// Lagos-Airbnb page
app.get("/lagos-airbnb", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "lagos-airbnb", "index.html"));
});

// Landing page (homepage)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing-page", "index.html"));
});

// ==========================================
// SPA Fallback - MUST BE LAST
// ==========================================
// Using middleware instead of route to avoid path-to-regexp issues
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "landing-page", "index.html"));
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
