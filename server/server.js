require("dotenv").config();

// Force Google DNS to resolve MongoDB SRV records (fixes ISP DNS blocks)
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express(); 

app.use(cors());
app.use(express.json());

// MongoDB connection with robust options
const mongoOptions = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(process.env.MONGO_URI, mongoOptions)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.log("❌ MongoDB Error:", err.message);
    if (err.message.includes("ECONNREFUSED")) {
      console.log("👉 Tip: This usually means your ISP is blocking MongoDB DNS. Try using a VPN or changing your DNS to 8.8.8.8");
    }
  });

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