const express = require("express");
const router = express.Router();

router.post("/test", (req, res) => {
  res.json({
    message: "Test route working!",
    data: req.body,
  });
});

module.exports = router;