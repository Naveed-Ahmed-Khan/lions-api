const User = require("../models/user.model");

//////////////////////////////////////////////////////////////////////////////
async function updateQualifications(req, res) {
  const userId = req.params.id;
  const qualifications = req.body["qualifications"];

  const highestQualification = qualifications.reduce((max, curr) => {
    if (curr.passingYear > max.passingYear) {
      max = curr;
    }

    return max;
  }, qualifications[0]);

  console.log(highestQualification);

  try {
    const userData = await User.findByIdAndUpdate(userId, {
      qualifications,
      highestQualification,
    });

    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////
async function updateLocations(req, res) {
  const userId = req.params.id;
  const locations = req.body["locations"];

  console.log(locations);

  /* const highestLocation = locations.reduce((max, curr) => {
    if (curr.passingYear > max.passingYear) {
      max = curr;
    }
    return max;
  }, locations[0]);

  console.log(highestLocation); */

  /* try {
    const userData = await User.findByIdAndUpdate(userId, {
      locations,
      highestLocation,
    });

    res.status(200).json(userData);
    // console.log(userData);
  } catch (error) {
    res.status(404).send({ error: error.message });
  } */
}

module.exports = {
  updateQualifications,
  updateLocations,
};
