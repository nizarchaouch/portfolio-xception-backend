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
}, { minimize: false });

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
}, { minimize: false });

const navSettingsSchema = new mongoose.Schema({
  navbar: {
    type: Object,
    default: {},
  },
  logo: {
    type: Object,
    default: {},
  },
  links: {
    type: Object,
    default: {},
  },
}, { minimize: false });

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
    type: navSettingsSchema,
    default: {},
  },
}, { minimize: false });

const portfSchema = new mongoose.Schema({
  idCandidat: {
    type: String,
    required: true,
  },
  navbar: {
    type: navSchema,
    required: true,
  },
  pages: [pageSchema],
}, { minimize: false });

module.exports = mongoose.model("portfolio", portfSchema);

