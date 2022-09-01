const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const City = new mongoose.model("City", CitySchema);

module.exports = City;
