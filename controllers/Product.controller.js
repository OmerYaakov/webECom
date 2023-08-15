import ProductModel from "../models/Product.model.js";

const create = async (req, res) => {
    try {
        const product = new ProductModel({
            id: req.body.id,
            productName: req.body.productName,
            categoryId: req.body.categoryId,
            price: req.body.price,
            image: req.body.image,

        });
        const data = await product.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findAll = (req, res) => {
    ProductModel.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};

const findOne = (req, res) => {
    console.log(req.params.id);
    ProductModel.find({ id: req.params.id }).then((product) => {
        res.status(200).json(product);
    }
    ).catch((error) => {
        res.status(500).json({ message: error.message });
    }
    );
};

const update = (req, res) => {
    ProductModel.findOneAndUpdate({ id: req.params.id }, {
        id: req.body.id,
        productName: req.body.productName,
        categoryId: req.body.categoryId,
        price: req.body.price,
        image: req.body.image,
    }, { new: true }).then((product) => {
        res.status(200).json(product);
    }
    ).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

const remove = (req, res) => {
    ProductModel.findOneAndDelete({ id: req.params.id }).then((product) => {
        res.status(200).json(product);
    }
    ).catch((error) => {
        res.status(500).json({ message: error.message });
    });
}

export {
    remove, update, findAll, findOne, create
}