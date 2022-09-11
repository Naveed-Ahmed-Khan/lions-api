const mongoose = require("mongoose");

const Id = mongoose.Schema.Types.ObjectId;

const AreaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city_id: { type: Id, ref: "City", required: true },
});

const Area = new mongoose.model("Area", AreaSchema);

module.exports = Area;
