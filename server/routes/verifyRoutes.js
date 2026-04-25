const express = require("express");
const router = express.Router(); // ✅ DEFINE ROUTER

router.post("/verify-candidate", async (req, res) => {
  const { name, github } = req.body;

  console.log("Received:", name, github);

  res.json({
    trustScore: 85,
    activity: "Active contributor",
    redFlags: ["No major issues"],
  });
});

module.exports = router; // ✅ EXPORT ROUTER