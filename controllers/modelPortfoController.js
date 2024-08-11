const portfoModel = require("../models/modelPortfolio");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  PORTFOLIO_NOT_FOUND: "model portfolio not found",
};

const add = async (req, res) => {
  const { nom, navbar, pages } = req.body;

  // Validation des entrées
  if (!pages) {
    return res.status(400).json({ error: "pages are required" });
  }

  try {
    const newPortfolio = new portfoModel({
      nom,
      navbar,
      pages,
    });

    const savedPortfolio = await newPortfolio.save();
    console.log("Model Portfolio added successfully:", savedPortfolio);

    res.status(201).json({ message: savedPortfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAll = async (req, res) => {
  try {
    const docs = await portfoModel.find();
    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { add, getAll };
