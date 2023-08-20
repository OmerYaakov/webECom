import OrderModel from "../models/Order.model.js";

const create = async (req, res) => {
    try {
        const order = new OrderModel({
            id: req.body.id,
            userId: req.body.userId,
            cartId: req.body.cartId,
            totalPrice: req.body.totalPrice,
            city: req.body.city,
            street: req.body.street,
            creditCard: req.body.creditCard
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: "New Order Created", order: createdOrder });
    } catch (error) {
        res.status(500).send({ message: error.message ? error.message : "Error in Creating Order" });
    }
};

const findAll = (req, res) => {
    OrderModel.find().then((orders) => {
        res.status(200).send(orders);
    }).catch((error) => {
        res.status(500).send({ message: "Error in Fetching Orders" });
    });
};

const findOne = (req, res) => {
    OrderModel.find({ id: req.params.id }).then((order) => {
        res.status(200).send(order);
    }
    ).catch((error) => {
        res.status(500).send({ message: "Error in Fetching Order" });
    });
};

// const findAllByUserId = (req, res) => {
// }

const update = (req, res) => {
    OrderModel.findOneAndUpdate({ id: req.params.id }).then((order) => {
        order.id = req.body.id;
        order.userId = req.body.userId;
        order.cartId = req.body.cartId;
        order.totalPrice = req.body.totalPrice;
        order.city = req.body.city;
        order.street = req.body.street;
        order.creditCard = req.body.creditCard;
        order.save();
        res.status(200).send({ message: "Order Updated" });
    }
    ).catch((error) => {
        res.status(500).send({ message: error.message ? error.message : "Error in Updating Order" });
    }
    );
};

const remove = (req, res) => {
    OrderModel.deleteOne({ id: req.params.id }).then(() => {
        res.status(200).send({ message: "Order Deleted" });
    }).catch((error) => {
        res.status(500).send({ message: "Error in Deleting Order" });
    });
}

export {
    remove, update, findAll, findOne, create
}