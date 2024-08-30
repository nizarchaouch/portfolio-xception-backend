const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/modelPortfoController");

router.post("/add", portfolioController.add);

router.put("/update/:id", portfolioController.update);

router.get("/getAll", portfolioController.getAll);
router.get("/get/:id", portfolioController.getById);

router.delete("/delt/:id", portfolioController.deltById);

module.exports = router;
