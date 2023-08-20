import ContactModel from "../models/Contact.model.js";
import CategoryModel from "../models/Category.model.js";

const create = async (req, res) => {
    const contact = new ContactModel({
      id:req.id,
       name: req.name,
        phoneNumber: req.phoneNumber,
        mail: req.mail,
        message:req.message
    });
    try {
        const data = await contact.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the Contact msg."
        });
    }
};

const remove = (req, res) => {
    ContactModel.findOneAndRemove({ id: req.params.id })
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            res.status(200).send({ message: "contact msg deleted successfully!" });
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "contact msg not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete contact msg with id " + req.params.id
        });
    });
}

const findOne = (req, res) => {
    ContactModel.find({ id: req.params.id }).then(contact => {
        if (!contact) {
            return res.status(404).send({
                message: "contact msg not found with id " + req.params.id
            });
        }
        res.status(200).send(contact);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact msg not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving contact msg with id " + req.params.id
        });
    });
};

const findAll = (req, res) => {
    ContactModel.find()
        .then(contact => {
            res.send(contact);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contact msg."
        });
    });
};

export {
    remove, findAll, findOne, create
}
