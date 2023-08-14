    const express = require('express')
    const router = express.Router()
    const cartsProducts = require('../Controller/cartProduct.controller');
    const e = require("express");

    // Create a new cartProduct
    router.post('/cartsProducts', cartsProducts.create);

    // Retrieve all cartsProducts
    router.get('/cartsProducts', cartsProducts.findAll);

    // Retrieve a single cartProduct with cartProductId
    router.get('/cartsProducts/:cartProductId', cartsProducts.findOne);

    // Update a cartProduct with cartProductId
    router.put('/cartsProducts/:cartProductId', cartsProducts.update);

    // Delete a cartProduct with cartProductId
    router.delete('/cartsProducts/:cartProductId', cartsProducts.delete);


    module.exports=router;
