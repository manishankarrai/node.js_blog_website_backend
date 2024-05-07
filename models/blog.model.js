const Sequelize = require('sequelize')
const { sequelize } = require('../config/sql.connection')
const { Category } = require('./category.model')
const { Comment } =  require('./comment.model')

const Blog = sequelize.define('blogs', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    title: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    } 
} ,  {
    paranoid: true
  });

Blog.hasMany(Comment, { foreignKey: 'blogId' });
Blog.belongsTo(Category, { foreignKey: 'categoryId' }); 

module.exports = {
    Blog
};
