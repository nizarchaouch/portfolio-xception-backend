const portfoModel = require("../models/modelPortfolio");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  PORTFOLIO_NOT_FOUND: "model portfolio not found",
};

const add = async (req, res) => {
  const { nom, navbar, pages } = req.body;

  // Validation des entrées
  if (!nom || !pages) {
    return res.status(400).json({ error: "name and pages are required" });
  }

  try {
    // Create a new portfolio
    const newPortfolio = new portfoModel({
      nom,
      navbar,
      pages,
    });

    const savedPortfolio = await newPortfolio.save();
    console.log("Model added successfully:", savedPortfolio);

    // Envoi de la réponse au candidat
    res.status(201).json({
      message: "Model added successfully",
      portfolio: savedPortfolio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await portfoModel.findById(id);
    res.status(200).json(portfolio);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAll = async (req, res) => {
  try {
    const docs = await portfoModel.find({}, "_id nom");
    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deltById = async (req, res) => {
  try {
    const id = req.params.id;
    await portfoModel.findByIdAndDelete(id);
    res.status(200).json({ message: "model supprimer" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { add, getById, getAll, deltById };
