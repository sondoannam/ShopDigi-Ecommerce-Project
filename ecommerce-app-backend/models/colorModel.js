const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const colorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    code: {
      type: String, 
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Color", colorSchema);