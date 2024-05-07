

const Sequelize =  require('sequelize');
const sequelize =  new Sequelize(
   'blogs', 'root' , 'Rajan@123' , { host: 'localhost' , dialect: 'mysql' }
);

const dbConnection  =  async()=> {
       try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log(" Success ! Database conncetion successfully done ")
       } catch(err) {
           console.log(" Error ! Database conncetion failed " , err)
       }
}

dbConnection();


module.exports = {
    sequelize
};