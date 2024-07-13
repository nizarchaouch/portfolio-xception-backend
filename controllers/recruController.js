const authController = require("./userController");
const recruModel = require("../models/user");
const bcrypt = require("bcryptjs");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  RECRUTEUR_NOT_FOUND: "recruteur not found",
};

const signup = async (req, res) => {
  const data = req.body;
  let existingrecru;

  try {
    existingrecru = await recruModel.findOne({ mail: data.mail });
  } catch (err) {
    console.log(err);
  }

  if (existingrecru) {
    return res.status(400).json({ error: "RecruteurExisteDeja" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const recruteur = new recruModel({
      imageUrl: data.imageUrl,
      logo: data.logo,
      nomEntreprise: data.nomEntreprise,
      description: data.description,
      identifiant: data.identifiant,
      secteur: data.secteur,
      nom: data.nom,
      prenom: data.prenom,
      dateNais: data.dateNais,
      tel: data.tel,
      civilite: data.civilite,
      adress: data.adress,
      mail: data.mail,
      password: hashedPassword,
      role: "recruteur",
    });

    await recruteur.save();

    return res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
};

const login = async (req, res) => {
  const data = req.body;
  authController.authenticate(data, res);
};

const getRec = async (req, res) => {
  authController.getUser(req, res);
};
const getRecInfo = async (req, res) => {
  try {
    const id = req.params.id;
    const infoRec = await recruModel.findById(id);

    if (!infoRec) {
      return res.status(404).json({ message: "Rec not found" });
    }

    res.status(200).json(infoRec);
  } catch (error) {
    console.error("Error retrieving rec info:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logout = (req, res) => {
  authController.logout(res);
};

const updateRec = async (req, res) => {
  authController.updateUser(req, "Recruteur", res);
};

module.exports = { signup, login, getRec, getRecInfo, logout, updateRec };
