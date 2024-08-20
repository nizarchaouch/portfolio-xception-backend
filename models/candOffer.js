const mongoose = require("mongoose");

const candSchema = new mongoose.Schema({
  idCandidat: {
    type: String,
    require: true,
  },
  idOffer: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  cv: {
    type: String,
    enum: ["CV", "Portfolio"],
  },
  letter: {
    type: String,
  },
  etat: {
    type: String,
    require: true,
    default: "En Attend",
  },
});

module.exports = mongoose.model("candidature", candSchema);
