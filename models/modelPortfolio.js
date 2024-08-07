const mongoose = require("mongoose");

const blocSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  settings: {
    type: Object,
    default: {},
  },
});

const pageSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  bloc: [blocSchema],
});
const navSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  settings: {
    type: Object,
    default: {},
  },
});

const portfSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  navbar: [navSchema],
  pages: [pageSchema],
});

module.exports = mongoose.model("ModelPortfolio", portfSchema);
