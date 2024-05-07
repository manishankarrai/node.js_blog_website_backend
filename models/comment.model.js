const Sequelize =  require('sequelize');
const { sequelize }=  require('../config/sql.connection')
const { Blog } =  require('./blog.model')

const Comment =  sequelize.define('comments' , {
       id : {
           type : Sequelize.INTEGER , 
           autoIncrement: true , 
           primaryKey  : true 
       } , 
       blogId: {
           type : Sequelize.INTEGER , 
           allowNull: false , 
           refrences : {
                model : Blog , 
                key : 'id'
           }
       } ,
       sessionId : {
           type : Sequelize.STRING , 
           allowNull: true 
       } ,
       value : {
          type: Sequelize.TEXT , 
          allowNull: false 
       }
} ,  {
    paranoid: true 
  })


module.exports = {
     Comment
}