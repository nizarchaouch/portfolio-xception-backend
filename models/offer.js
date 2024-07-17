const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  idRec: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
    require: true,
  },
  nomEntreprise: {
    type: String,
    require: true,
  },
  secteur: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  titre: {
    type: String,
    require: true,
  },
  salaire: {
    type: String,
  },
  vacants: {
    type: Number,
    require: true,
    default: 1,
  },
  typeOffer: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
  },
  niveauCand: {
    type: String,
  },
  langue: {
    type: String,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
  exigence: {
    type: String,
    require: true,
  },
  date_creation: {
    type: Date,
    require: true,
  },
  date_expiration: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model("offer", offerSchema);
