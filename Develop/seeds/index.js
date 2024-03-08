const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const seedUser = require("./userSeed.json");
const seedPost = require("./postSeed.json");
const seedComment = require('./commentSeed.json');

const seedDatabase = async () => {
  try {

  
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(seedUser, { individualHooks: true });

  await seedUser();

  await seedPost();

  } catch (err) {
    console.log(err);
    console.error('There was an error seeding the database.');
  }

  process.exit(0);
};

seedDatabase();