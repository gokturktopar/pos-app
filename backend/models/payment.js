
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize)=> sequelize.define('Payment', {
  customerId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  qrCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: false,
  sequelize,
  modelName: 'Payment'
});
