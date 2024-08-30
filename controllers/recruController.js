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
  if (!data.mail || !data.password) {
    return res.status(400).json({ error: "mail and password are required" });
  }
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

const add = async (req, res) => {
  const data = req.body;
  let existingrecru;

  try {
    // Vérification si le recruteur existe déjà
    existingrecru = await recruModel.findOne({ mail: data.mail });
  } catch (err) {
    console.log(
      "Erreur lors de la vérification de l'existence du recruteur:",
      err
    );
    return res.status(500).json({ error: "ErreurServeur" });
  }

  if (existingrecru) {
    return res.status(400).json({ error: "Recruteur Existe Deja" });
  }

  try {
    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Création du nouveau recruteur
    const recruteur = new recruModel({
      imagePath: data.imagePath,
      logoPath: data.logoPath,
      nomEntreprise: data.nomEntreprise,
      fondee: data.fondee,
      taill_ent: data.taill_ent,
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
      socialLinks: data.socialLinks,
      password: hashedPassword,
      role: "recruteur",
      statut: true,
    });

    await recruteur.save();
    //send mail verifie
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_MAIL,
        pass: process.env.MY_PASSWORD,
      },
    });
    const mailOptions = {
      from: "nizar@gmail.com",
      to: data.mail,
      subject: "Ajouter comme recruteur sur PORTFOLIO XCEPTION",
      html: `<!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérification d'e-mail</title>
        <style>
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          p {
            margin-bottom: 20px;
            color: #666;
          }
          button {
            display: inline-block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #74b4f7;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
          }
          button:hover {
            background-color: #0056b3;
          }
          button a {
            color: #fff;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Cher ${data.nom} ${data.prenom},</p>
          <p>Bienvenue sur notre site en tant que recruteur, votre compte a été créé avec succès, Cliquez sur le bouton ci-dessous pour vous connecter :</p>
          <p>Voter Mots de passe: ${data.password}</p>
          <button><a href="http://localhost:8000/api/user/verifier/${data.mail}" style="color: #fff;">Se Connecter</a></button>
        </div>
      </body>
      </html>
        
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Email sent" });
      }
    });

    return res.status(201).json({ message: "Ajout réussi" });
  } catch (err) {
    console.log("Erreur lors de l'ajout du recruteur:", err);
    return res.status(500).json({ error: "Impossible d'ajouter le recruteur" });
  }
};

const login = async (req, res) => {
  const data = req.body;
  authController.authenticate(data, res);
};

const getRec = async (req, res) => {
  authController.getUser(req, res);
};
const getAll = async (req, res) => {
  try {
    const docs = await recruModel.find({ role: "recruteur" });
    const usersWithoutPasswords = docs.map((doc) => {
      const user = doc.toObject(); // Convertir en objet JS
      delete user.password; // Supprimer le mot de passe
      return user;
    });
    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: ERROR_MESSAGES.RECRUTEUR_NOT_FOUND });
  }
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
  authController.updateUser(req, res);
};
const updateVerif = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    // If the password is not modified, update other information
    const updatedUser = await recruModel.findByIdAndUpdate(id, {
      verifier: data.verifier,
      statut: data.statut,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }

    res.status(200).json({ message: "état mis à jour avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const deleteRecu = async (req, res) => {
  try {
    const id = req.params.id;
    const recu = await recruModel.findByIdAndDelete(id);

    if (!recu) {
      return res
        .status(404)
        .json({ error: ERROR_MESSAGES.RECRUTEUR_NOT_FOUND });
    }

    res.status(200).json({ message: "supprimer avec succès" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
module.exports = {
  signup,
  add,
  login,
  getRec,
  getRecInfo,
  logout,
  updateRec,
  getAll,
  updateVerif,
  deleteRecu,
};
