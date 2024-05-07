const Sequelize = require('sequelize')
const { sequelize } = require('../config/sql.connection')

const Category = sequelize.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  priority: {
    type: Sequelize.INTEGER,
    allowNull: true
  }


}, {
  paranoid: true 
})


module.exports = {
  Category
}