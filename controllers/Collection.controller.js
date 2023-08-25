import CollectionModel from "../models/Collection.model.js";

const create = async (req, res) => {
    try {
        const branch = new CollectionModel({
            id: Math.floor(Math.random() * 1000),
            name: req.body.name,
            Date: req.body.Date,
            products: req.body.products,
        });
        const data = await branch.save();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Collection.",
        });
    }
};

const findAll = (req, res) => {
    CollectionModel.find()
        .then((collection) => {
            res.send(collection);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving collection.",
            });
        });
};

const update = (req, res) => {
    CollectionModel.findOneAndUpdate(
        { id: req.params.id },
        {
            name: req.body.name,
            Date: req.body.Date,
            products: req.body.products,
        },
        { new: true }
    )
        .then((collection) => {
            if (!collection) {
                return res.status(404).send({
                    message: "collection not found with id " + req.params.id,
                });
            }
            res.send(collection);
        })
        .catch((error) => {
            if (error.kind === "ObjectId") {
                return res.status(404).send({
                    message: "collection not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error updating collection with id " + req.params.id,
            });
        });
};

const remove = (req, res) => {
    CollectionModel.findOneAndDelete({ id: req.params.id })
        .then((collection) => {
            if (!collection) {
                return res.status(404).send({
                    message: "collection not found with id " + req.params.id,
                });
            }
            res.send({ message: "collection deleted successfully!" });
        })
        .catch((error) => {
            if (error.kind === "ObjectId" || error.name === "NotFound") {
                return res.status(404).send({
                    message: "collection not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Could not delete branch with id " + req.params.id,
            });
        });

}

export { create, findAll, update, remove };