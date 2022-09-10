const Area = require("../models/area.model");

//////////////////////////////////////////////////////////////////////////////
async function addArea(req, res) {
  try {
    const data = Area.create(req.body);
    res.status(201).json(data);
    console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getAreas(req, res) {
  const { query } = req;

  console.log(query?.city);

  try {
    let areas = [];
    if (query?.city) {
      const data = await Area.find().populate("city_id").exec();
      areas = data.filter((area) => area.city_id.name === query.city);
    } else {
      areas = await Area.find().populate("city_id").exec();
    }
    res.status(200).json(areas);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleArea(req, res) {
  const areaId = req.params.id;
  try {
    const data = await Area.findById(areaId).populate("city_id").exec();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateArea(req, res) {
  const areaId = req.params.id;
  try {
    const data = await Area.findByIdAndUpdate(areaId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(JobData);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteArea(req, res) {
  const areaId = req.params.id;
  try {
    await Area.findByIdAndDelete(areaId);
    res.status(200).json({ msg: "Area Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addArea,
  getAreas,
  getSingleArea,
  updateArea,
  deleteArea,
};
