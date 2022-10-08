const Blacklist = require("../models/blacklist.model");

//////////////////////////////////////////////////////////////////////////////
async function addBlacklist(req, res) {
  try {
    const data = Blacklist.create(req.body);
    res.status(201).json(data);
    console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getBlacklists(req, res) {
  const { query } = req;

  console.log(query?.city);

  try {
    let blacklists = [];
    if (query?.city) {
      const data = await Blacklist.find().populate("city_id").exec();
      blacklists = data.filter(
        (blacklist) => blacklist.city_id.name === query.city
      );
    } else {
      blacklists = await Blacklist.find().populate("city_id").exec();
    }
    res.status(200).json(blacklists);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function getSingleBlacklist(req, res) {
  const blacklistId = req.params.id;
  try {
    const data = await Blacklist.findById(blacklistId)
      .populate("city_id")
      .exec();
    res.status(200).json(data);
    // console.log(data);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateBlacklist(req, res) {
  const blacklistId = req.params.id;
  try {
    const data = await Blacklist.findByIdAndUpdate(blacklistId, {
      ...req.body,
    });
    res.status(200).json(data);
    // console.log(JobData);
  } catch (error) {
    res.status(404).json({ error });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function deleteBlacklist(req, res) {
  const blacklistId = req.params.id;
  try {
    await Blacklist.findByIdAndDelete(blacklistId);
    res.status(200).json({ msg: "Blacklist Deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
}

module.exports = {
  addBlacklist,
  getBlacklists,
  getSingleBlacklist,
  updateBlacklist,
  deleteBlacklist,
};
