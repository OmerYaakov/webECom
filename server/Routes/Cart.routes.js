// module.exports = (app) => {
//     const carts = require('../Controller/cart.controller');
//
//     // Create a new cart
//     app.post('/carts', carts.create);
//
//     // Retrieve all carts
//     app.get('/carts', carts.findAll);
//
//     // Retrieve a single cart with cartId
//     app.get('/carts/:cartId', carts.findOne);
//
//     // Update a cart with cartId
//     app.put('/carts/:cartId', carts.update);
//
//     // Delete a cart with cartId
//     app.delete('/carts/:cartId', carts.delete);
// }

const express = require('express')
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated')
const carts = require('../Controller/cart.controller')

    // Create a new cart
    router.post('/carts', carts.create);

    // Retrieve all carts
     router.get('/carts', carts.findAll);

     // Retrieve a single cart with cartId
     router.get('/carts/:cartId', carts.findOne);

        // Update a cart with cartId + add a middleware
     router.put('/carts/:cartId',isAuthenticated, carts.update);

     // Delete a cart with cartId
     router.delete('/carts/:cartId', carts.delete);

module.exports = router;