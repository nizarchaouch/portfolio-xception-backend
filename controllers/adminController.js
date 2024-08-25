const authController = require("./userController");
const adminModel = require("../models/user");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  CANDIDAT_NOT_FOUND: "admin not found",
};

const addAdmin = async (req, res) => {
  const data = req.body;
  let existingAdmin;

  try {
    existingAdmin = await adminModel.findOne({
      mail: data.mail,
    });
  } catch (err) {
    console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ error: "Admin Existe Deja" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const admin = new adminModel({
      imagePath: data.imagePath,
      nom: data.nom,
      prenom: data.prenom,
      tel: data.tel,
      mail: data.mail,
      role: "admin",
      verifier: true,
      password: hashedPassword,
    });

    await admin.save();
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
      subject: "Ajouter en tant qu'administrateur",
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
          <h1>ajouter en tant qu'administrateur</h1>
          <p>Cher ${data.nom} ${data.prenom},</p>
          <p>Bienvenue sur notre site en tant qu'administrateur, votre compte a été créé avec succès, Cliquez sur le bouton ci-dessous pour vous connecter :</p>
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

    return res.status(201).json({ message: "Ajouté avec succès" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
};

const login = async (req, res) => {
  const data = req.body;
  authController.authenticate(data, "Admin", res);
};

const getCand = async (req, res) => {
  return authController.getUser(req, res);
};

const getAll = async (req, res) => {
  try {
    const docs = await adminModel.find({ role: "admin" });
    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
};

const logout = (req, res) => {
  authController.logout(res);
};

const updateAdmin = async (req, res) => {
  authController.updateUser(req, res);
};
module.exports = {
  addAdmin,
  login,
  getCand,
  getAll,
  logout,
  updateAdmin,
};
