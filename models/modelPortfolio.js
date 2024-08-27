const mongoose = require("mongoose");

const blocSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
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
  },
  { minimize: false }
);

const pageSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    bloc: [blocSchema],
  },
  { minimize: false }
);

const navSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
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
  },
  { minimize: false }
);

const portfSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    navbar: {
      type: navSchema,
      required: true,
    },
    pages: [pageSchema],
  },
  { minimize: false }
);

module.exports = mongoose.model("ModelPortfolio", portfSchema);
