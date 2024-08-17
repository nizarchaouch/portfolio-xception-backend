const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/portfoController");

router.post("/add", portfolioController.add);

router.get("/get/:id", portfolioController.getById);
router.get("/checkPortfolio/:id", portfolioController.checkPortfolioExists);

module.exports = router;
