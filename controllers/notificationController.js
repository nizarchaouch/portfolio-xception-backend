const notifModel = require("../models/notification");

const ERROR_MESSAGES = {
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  UNABLE_TO_ADD: "Unable to add",
  CANDIDAT_NOT_FOUND: "Notification not found",
};

const add = async (req, res) => {
  const data = req.body;

  try {
    const notif = new notifModel({
      idUser: data.idUser,
      contenu: data.contenu,
      date: new Date(),
      etat: true,
    });
    console.log(notif);

    await notif.save();
    return res.status(201).json({ message: "Notif Add" });
  } catch (error) {
    return res.status(201).json({ error: ERROR_MESSAGES.UNABLE_TO_ADD });
  }
};

const getNotif = async (req, res) => {
  try {
    const id = req.params.id;
    const notif = await notifModel.find({ idUser: id });

    if (!notif.length) {
      return res.status(404).json({ message: "Aucune notif trouvée." });
    }
    res.status(200).json({ notif });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await notifModel.updateMany(
      { idUser: id, etat: true },
      { $set: { etat: false } }
    );

    if (result.nModified === 0) {
      return res.status(404).json({ message: "Aucune notification non lue trouvée" });
    }

    res.status(200).json({ message: "Toutes les notifications marquées comme lues" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  add,
  getNotif,
  markAllAsRead
};
