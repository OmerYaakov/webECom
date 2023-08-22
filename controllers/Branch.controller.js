import BranchModel from "../models/Branch.model.js";

const create = async (req, res) => {
    try {
        const branch = new BranchModel({
            id: Math.floor(Math.random() * 1000),
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
        });
        const data = await branch.save();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Branch.",
        });
    }
};

const findAll = (req, res) => {
    BranchModel.find()
        .then((branch) => {
            res.send(branch);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving branch.",
            });
        });
};

const update = (req, res) => {
    BranchModel.findOneAndUpdate(
        { id: req.params.id },
        {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
        },
        { new: true }
    )
        .then((branch) => {
            if (!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.id,
                });
            }
            res.send(branch);
        })
        .catch((error) => {
            if (error.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Error updating branch with id " + req.params.id,
            });
        });
};

const remove = (req, res) => {
    BranchModel.findOneAndDelete({ id: req.params.id })
        .then((branch) => {
            if (!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.id,
                });
            }
            res.send({ message: "Branch deleted successfully!" });
        })
        .catch((error) => {
            if (error.kind === "ObjectId" || error.name === "NotFound") {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.id,
                });
            }
            return res.status(500).send({
                message: "Could not delete branch with id " + req.params.id,
            });
        });

}

export { create, findAll, update, remove };