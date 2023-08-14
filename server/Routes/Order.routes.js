    const express = require('express')
    const router = express.Router()
    const orders = require('../Controller/order.controller');
    const isAuthenticated = require('../middlewares/isAuthenticated')

    // Create a new order
    router.post('/orders', isAuthenticated,orders.create);

    // Retrieve all orders
    router.get('/orders', isAuthenticated, orders.findAll);

    //Retrieve all orders with userId
    router.get('/orders/:userId', isAuthenticated, orders.findAllByUserId);

    // Retrieve a single order with orderId
    router.get('/orders/:orderId', isAuthenticated, orders.findOne);

    // Update a order with orderId
    router.put('/orders/:orderId', isAuthenticated, orders.update);

    // Delete a order with orderId
    router.delete('/orders/:orderId', isAuthenticated, orders.delete);



    module.exports= router;