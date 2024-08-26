const mongoose = require("mongoose");

const notifSchema = new mongoose.Schema({
  idUser: {
    type: String,
    require: true,
  },
  contenu: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  etat: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("notification", notifSchema);
