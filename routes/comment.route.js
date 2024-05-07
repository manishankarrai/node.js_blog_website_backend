const express = require('express');
const commentRoute = express.Router();
const { Comment } = require('../models/comment.model');
const { Blog } = require('../models/blog.model');



commentRoute.post('/store', async (req, res) => {
    try {

        let data = await Comment.create(req.body);

        res.status(200).json(data);
    } catch (err) {
        
        res.status(500).json({ error: err.message });
    }
});


commentRoute.put('/update/:id', async (req, res) => {
    try {
        await Comment.update(req.body, { where: { id: req.params.id } });
        let data = await Comment.findByPk(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

commentRoute.delete('/delete/:id', async (req, res) => {
    try {
        await Comment.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = {
    commentRoute
};
