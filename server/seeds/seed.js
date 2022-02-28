const db = require('../config/connection');
const { User, Toys } = require('../models');

const usersData = require('./usersData.json');
const toysData = require('./toysData.json');

// TODO
// Please, remove the deleteMany() method when the project is done to prevent data loss

db.once('open', async () => {

  await User.deleteMany({});
  for (const user of usersData) {
    await User.create(user)
  }
  console.log('Users seeded!');

  await Toys.deleteMany({});
  for (const toy of toysData) {
    await Toys.create(toy)
  }

  console.log('Toys seeded!');

  process.exit(0);
});
