const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  shoppingList: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      purchased: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
