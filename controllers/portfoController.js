const portfoModel = require("../models/portfolio");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  PORTFOLIO_NOT_FOUND: "portfolio not found",
};

const add = async (req, res) => {
  const { idCandidat, navbar, pages } = req.body;

  // Validation des entrées
  if (!idCandidat || !pages) {
    return res.status(400).json({ error: "idCandidat and pages are required" });
  }

  try {
    const portfolio = await portfoModel.find({ idCandidat });

    if (portfolio.length > 0) {
      // Update the existing portfolio
      await portfoModel.findByIdAndUpdate(
        portfolio[0]._id,
        {
          navbar,
          pages,
        },
        { new: true } // This option ensures the updated document is returned
      );
      res.status(200).json({ message: "Portfolio updated successfully" });
    } else {
      // Create a new portfolio
      const newPortfolio = new portfoModel({
        idCandidat,
        navbar,
        pages,
      });

      const savedPortfolio = await newPortfolio.save();
      console.log("Portfolio added successfully:", savedPortfolio);

      // Envoi de la réponse au candidat
      res
        .status(201)
        .json({
          message: "Portfolio added successfully",
          portfolio: savedPortfolio,
        });
    }
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

const checkPortfolioExists = async (req, res) => {
  try {
    const id = req.params.id;
    const portfolio = await portfoModel.find({ idCandidat: id });
    res.status(200).json(portfolio.length > 0);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { add, getById, checkPortfolioExists };
