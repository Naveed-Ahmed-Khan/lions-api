const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  user_id: { type: Id, ref: "User" /* , required: true */ },
  products: [{ type: Id, ref: "User" }],
  products: [
    {
      product_id: { type: Id, ref: "Product" },
      amount: { type: Number, default: 0 },
    },
  ],
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
