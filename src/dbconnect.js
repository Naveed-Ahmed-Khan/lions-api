require("dotenv").config();
const mongoose = require("mongoose");
const City = require("./models/city.model.js");
const Area = require("./models/area.model");
const cities = require("../cities.json");
const areas = require("../areas.json");

const capitalize = (mySentence) => {
  const words = mySentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
};

const findCity = () => {
  cities.forEach(async (city) => {
    areas.forEach(async (area) => {
      if (city.id !== "3" && city.id === area.city_id) {
        const cit = await City.findOne({ name: capitalize(city.name) });
        // console.log(cit);
        console.log(
          capitalize(area.area) + " in " + cit.name + " id: " + cit._id
        );
        await Area.create({
          name: capitalize(area.area),
          city_id: cit._id,
        });
        // console.log(capitalize(area.area) + " in " + capitalize(city.name));
      }
    });
  });
};

const addCity = () => {
  cities.forEach(async (city) => {
    await City.create({
      name: capitalize(city.name),
    });
  });
};

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // addCity();
    // findCity();
    console.log("Connection to MongoDB Successful");
  })
  .catch((err) => console.log(err));
