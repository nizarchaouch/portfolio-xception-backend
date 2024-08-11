const portfoModel = require("../models/portfolio");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  PORTFOLIO_NOT_FOUND: "portfolio not found",
};

const add = async (req, res) => {
  const { idCandidat,navbar, pages } = req.body;

  // Validation des entrées
  if (!idCandidat || !pages) {
    return res.status(400).json({ error: "idCandidat and pages are required" });
  }

  try {
    const newPortfolio = new portfoModel({
      idCandidat,
      navbar,
      pages,
    });

    const savedPortfolio = await newPortfolio.save();
    console.log("Portfolio added successfully:", savedPortfolio);

    // Envoi de la réponse au client
    res.status(201).json({ message: savedPortfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await portfoModel.find({ idCandidat: id });
    res.status(200).json(portfolio);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { add, getById };
