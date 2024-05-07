const express = require('express');
const blogRoute = express.Router();
const { Blog } = require('../models/blog.model');
const { Category } = require('../models/category.model')
const { Comment } = require('../models/comment.model')


blogRoute.get('/get', async (req, res) => {

    try {
        let data = await Blog.findAll({
            include: [

                {
                    model: Category,
                    attributes: ['id', 'name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'value', 'createdAt']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    
});
blogRoute.get('/get/:id', async (req, res) => {
    try {
        let data = await Blog.findByPk(req.params.id, {
            include: [{
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Comment,
                attributes: ['id', 'value', 'createdAt']
            }]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

blogRoute.post('/find', async (req, res) => {
    try {
        let data = await Blog.findAll({
            include: [{
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Comment,
                attributes: ['id', 'value', 'createdAt']
            }],
            where: req.body
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
blogRoute.get('/category/:id', async (req, res) => {
    try {
        // let name  =  req.params.name
        // first find into category and then get id and then search this in blog
        let data = await Blog.findAll({
            include: [{
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Comment,
                attributes: ['id', 'value', 'createdAt']
            }],
            where: { categoryId :  req.params.id }
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

blogRoute.post('/store', async (req, res) => {
    try {
        let store = await Blog.create(req.body);
        let data = await Blog.findByPk(store.id, {
            include: [{
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Comment,
                attributes: ['id', 'value', 'createdAt']
            }]
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

blogRoute.post('/update', async (req, res) => {
    try {
        await Blog.update(req.body.update, {
            where: req.body.where
        });
        let data = await Blog.findOne({
            include: [{
                model: Category,
                attributes: ['id', 'name']
            },
            {
                model: Comment,
                attributes: ['id', 'value', 'createdAt']
            }],
            where: req.body.where
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
blogRoute.delete('/delete/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await blog.destroy();

        console.log('Blog deleted:', blog.toJSON()); 

        res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = {
    blogRoute
};
