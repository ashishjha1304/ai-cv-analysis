require("dotenv").config();

// Force Google DNS to resolve MongoDB SRV records (fixes ISP DNS blocks)
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// This ensures that the mongodb driver also uses this resolver
const originalResolveSrv = dns.resolveSrv;
dns.resolveSrv = function(name, callback) {
  if (name.includes("mongodb.net")) {
    console.log("🔍 Custom DNS resolving for:", name);
  }
  return originalResolveSrv.apply(this, arguments);
};

const express = require("express");
const cors = require("cors");

const app = express(); 

app.use(cors());
app.use(express.json());

console.log("Supabase Client Initialized ✅ (Ready to insert)");

// Routes
const uploadRoutes = require("./routes/uploadRoutes");
const verifyRoutes = require("./routes/verifyRoutes");

app.use("/api", uploadRoutes);
app.use("/api", verifyRoutes); 

app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});