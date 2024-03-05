const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const seedUser = require("./userData");
const seedPost = require("./postData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  process.exit(0);
};

seedDatabase();