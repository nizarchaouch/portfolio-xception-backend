const candModel = require("../models/candOffer");
const offerModel = require("../models/offer");
const userModel = require("../models/user");

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  CANDIDAT_NOT_FOUND: "Candidature not found",
};

const add = async (req, res) => {
  const data = req.body;

  const existing = await candModel.findOne({
    idCandidat: data.idCandidat,
    idOffer: data.idOffer,
  });

  if (existing) {
    return res.status(409).json({ error: "Déjà postulé à cette offre" });
  }

  try {
    const candoffer = new candModel({
      idCandidat: data.idCandidat,
      idOffer: data.idOffer,
      cv: data.cv,
      letter: data.letter,
      date: new Date(),
    });
    console.log(candoffer);

    await candoffer.save();
    return res.status(201).json({ message: "Postuler successful" });
  } catch (error) {
    return res.status(201).json({ error: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
};

const showCandOffer = async (req, res) => {
  try {
    const id = req.params.id;
    const candOffers = await candModel.find({ idCandidat: id });

    if (!candOffers.length) {
      return res
        .status(404)
        .json({ message: "Aucune offre trouvée pour ce candidat." });
    }

    const offerIds = candOffers.map((offer) => offer.idOffer);

    const infOffers = [];

    // Boucle sur chaque idOffer et récupère les informations sur l'offre correspondante
    for (const offerId of offerIds) {
      const infOffer = await offerModel.findOne({ _id: offerId });
      infOffers.push(infOffer);
    }

    res.status(200).json({ candOffers, infOffers });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const showOfferApp = async (req, res) => {
  try {
    const id = req.params.id;
    const candOffers = await candModel.find({ idOffer: id });

    const CandIds = candOffers.map((candidat) => candidat.idCandidat);

    const infoCands = [];

    // Boucle sur chaque idOffer et récupère les informations sur l'offre correspondante
    for (const CandId of CandIds) {
      const infoCand = await userModel.findOne({ _id: CandId });
      infoCands.push(infoCand);
    }

    res.status(200).json({ candOffers, infoCands });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteCandOffer = async (req, res) => {
  try {
    const id = req.params.id;
    const CandOffer = await candModel.findByIdAndDelete(id);

    if (!CandOffer) {
      return res
        .status(404)
        .json({ message: ERROR_MESSAGES.CANDIDAT_NOT_FOUND });
    }

    res.status(200).json({ message: "Supprimé" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const changeEtatCandidateur = async (req, res) => {
  try {
    const { idOffer, idCandidat, reponse } = req.body;

    const updateCand = await candModel.findOneAndUpdate(
      { idOffer: idOffer, idCandidat: idCandidat }, // Filter criteria
      { etat: reponse } // Fields to update
    );

    if (!updateCand) {
      return res.status(404).json({ message: "L'état n'a pas été modifié" });
    }

    return res
      .status(200)
      .json({ message: "État modifié avec succès", updateCand });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  add,
  showCandOffer,
  showOfferApp,
  deleteCandOffer,
  changeEtatCandidateur,
};
