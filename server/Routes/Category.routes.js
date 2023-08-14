    const express = require('express')
    const router = express.Router()
    const categories = require('../Controller/category.controller');

    // Create a new category
    router.post('/categories', categories.create);

    // Retrieve all categories
    router.get('/categories', categories.findAll);

    // Retrieve a single category with categoryId
    router.get('/categories/:categoryId', categories.findOne);

    // Update a category with categoryId
    router.put('/categories/:categoryId', categories.update);

    // Delete a category with categoryId
    router.delete('/categories/:categoryId', categories.delete);


    module.exports=router;
