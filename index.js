const express =  require('express');
const { categoryRoute } = require('./routes/category.route');
const { blogRoute } = require('./routes/blog.route');
const { commentRoute } = require('./routes/comment.route');
require('dotenv').config();
require('./config/sql.connection');
const app     =  express();

app.use(express.json())
app.use('/category' , categoryRoute )
app.use('/blog' , blogRoute )
app.use('/comment' , commentRoute)

app.get('/' , (req , res)=> {
       res.status(200).send("<h1 style='text-align: center ; color : green;'>Its <span style='color: red'> Working </span>  </h1>")
})


app.listen( process.env.PORT || 3000 , ()=> console.log("server is running "))