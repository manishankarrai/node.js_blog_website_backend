const express = require('express')
const categoryRoute = express.Router();
const { Category } = require('../models/category.model')


categoryRoute.get('/get', async (req, res) => {

 try {

        let data = await Category.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json(data);
        
    } catch (err) {
        res.send(err);
    }

})
categoryRoute.get('/get/:id', async (req, res) => {

    let data = await Category.findByPk(req.params.id);

    res.status(200).json(data);
})


categoryRoute.post('/find', async (req, res) => {
    console.log(req.body);
    let data = await Category.findAll({ where: req.body });

    res.status(200).json(data);
})

categoryRoute.post('/store', async (req, res) => {

    let data = await Category.create(req.body);

    res.status(200).json(data);
})
categoryRoute.post('/update', async (req, res) => {

    let updateData = await Category.update(
        req.body.update,
        {
            // returning: true  ,

            where: req.body.where,
        }
    );
    let data = await Category.findOne({ where: req.body.where });


    res.status(200).json(data);
})
categoryRoute.delete('/delete/:id', async (req, res) => {

    let data = await Category.destroy(
        { where: { id: req.params.id } }
    );

    res.status(200).json(data);
})


module.exports = {
    categoryRoute
}