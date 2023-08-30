import CategoryModel from '../models/Category.model.js';

const create = async (req, res) => {
    const category = new CategoryModel({
        id: 123 || Math.floor(Math.random() * 1000) + 1,
        categoryName: req.body.categoryName,
        categoryImage: req.body.categoryImage,
    });
    try {
        const data = await category.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Category."
        });
    }
};

const findAll = (req, res) => {
    CategoryModel.find()
        .then(category => {
            res.send(category);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving category."
            });
        });
};

const findOne = (req, res) => {
    CategoryModel.find({ id: req.params.id }).then(category => {
        if (!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        res.status(200).send(category);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Category with id " + req.params.id
        });
    });
};

const update = (req, res) => {
    CategoryModel.findOneAndUpdate({ id: req.params.id }, {
        id: req.body.id,
        categoryName: req.body.categoryName,
        categoryImage: req.body.categoryImage,
    }, { new: true }).then(category => {
        if (!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        res.status(200).send(category);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating Category with id " + req.params.id
        });
    });
};

const remove = (req, res) => {
    CategoryModel.findOneAndRemove({ id: req.params.id })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.status(200).send({ message: "Category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Category with id " + req.params.id
            });
        });
}
export {
    remove, update, findAll, findOne, create
}