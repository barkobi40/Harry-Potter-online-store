const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  character: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  }
});

const productTable = mongoose.model("products", productSchema);

module.exports = productTable;
