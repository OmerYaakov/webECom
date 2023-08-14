const upload = require('../middlewares/uploads');
const express = require('express')
const router = express.Router()
    const products = require('../Controller/product.controller');

    // Create a new product
    router.post('/products', upload.single('image'), products.create);

    // Retrieve all products
    router.get('/products', (req, res) => {
        if (req.query.categoryName) {
            products.findByCategory(req, res);
        } else {
            products.findAll(req, res);
        }
    })

    // Retrieve a single product with productId
    router.get('/products/:productId', products.findOne);

    // Update a product with productId
    router.put('/products/:productId', products.update);

    // Delete a product with productId
    router.delete('/products/:productId', products.delete);


    module.exports= router;