const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/modelPortfoController");

router.post("/add", portfolioController.add);

router.get("/getAll", portfolioController.getAll);

module.exports = router;
