const mongoose = require("mongoose");

const blocSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
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

const portfSchema = new mongoose.Schema({
  idCandidat: {
    type: String,
    required: true,
  },
  pages: [pageSchema],
});



module.exports = mongoose.model("portfolio", portfSchema);
