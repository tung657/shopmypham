const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
      max: 255,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('categories', categorySchema);
