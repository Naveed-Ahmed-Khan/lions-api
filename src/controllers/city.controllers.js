const City = require("../models/city.model");

//////////////////////////////////////////////////////////////////////////////
async function addCity(req, res) {
  try {
    const data = await City.create(req.body);
    res.status(201).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getAllCities(req, res) {
  try {
    const data = await City.find({}).exec();
    // console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleCity(req, res) {
  const cityId = req.params.id;
  try {
    const data = await City.findById(cityId);
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateCity(req, res) {
  const cityId = req.params.id;
  try {
    const data = await City.findByIdAndUpdate(cityId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteCity(req, res) {
  const cityId = req.params.id;
  try {
    await City.findByIdAndDelete(cityId);
    res.status(200).json({ msg: "City Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addCity,
  getAllCities,
  getSingleCity,
  updateCity,
  deleteCity,
};
