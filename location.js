const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

const locationTable = mongoose.model("locations", locationSchema);

module.exports = locationTable;
