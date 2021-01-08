const { Sequelize } = require("sequelize");
const path = require("path");
const payment = require("../models/payment");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve(__dirname, "../data/dev.sqlite3"),
});

const PaymentModel = payment(sequelize, Sequelize);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database ready for usage...");
  })
  .catch((err) => console.log(err));

module.exports = {
  PaymentModel,
  sequelize
};
