import ProductModel from "../models/Product.model.js";

const create = async (req, res) => {
    try {
        console.log(req.body.image);
        const product = new ProductModel({
            id: Math.floor(Math.random() * 1000),
            modelNumber: req.body.modelNumber,
            productName: req.body.productName,
            details: req.body.details,
            categoryName: req.body.categoryName,
            goldWeight: req.body.goldWeight,
            goldType: req.body.goldType,
            diamondWeight: req.body.diamondWeight,
            diamondNumber: req.body.diamondNumber,
            price: req.body.price,
            image: "photos/" + req.body.image,
        });
        const data = await product.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findAll = (req, res) => {
    if (req.query.offset && req.query.limit) {
        const offset = parseInt(req.query.offset);
        const limit = parseInt(req.query.limit);
        if (req.query.search) {
            const search = req.query.search;
            ProductModel.find({ $or: [{ productName: { $regex: search, $options: 'i' } }, { categoryName: { $regex: search, $options: 'i' } }, { details: { $regex: search, $options: 'i' } }] })
                .skip(offset).limit(limit).then((products) => {
                    res.status(200).json(products);
                }
                ).catch((error) => {
                    res.status(500).json({ message: error.message });
                });
        }
        else {
            ProductModel.find().skip(offset).limit(limit)
                .then((products) => {
                    res.status(200).json(products);
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                });
        }
    }
    else {
        ProductModel.find()
            .then((products) => {
                res.status(200).json(products);
            })
            .catch((error) => {
                res.status(500).json({ message: error.message });
            });
    }
};

const findOneByID = (req, res) => {
    ProductModel.findOne({ id: req.params.id }) // Use findOne instead of find for a single product
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};
const findOne = (req, res) => {
    ProductModel.findOne({ id: req.params.id }) // Use findOne instead of find for a single product
        .then((product) => {
            res.status(200).json(product);
        })
        .catch((error) => {
            res.status(500).json({ message: error.message });
        });
};


const findOneByName = (productName) => {
    return ProductModel.findOne({ productName });
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
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
};

const remove = (req, res) => {
    ProductModel.findOneAndDelete({ id: req.params.id }).then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        res.status(500).json({ message: error.message });
    });
}

export {
    remove, update, findAll, findOne, findOneByID, findOneByName, create
}
