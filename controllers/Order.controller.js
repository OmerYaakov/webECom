import OrderModel from "../models/Order.model.js";
import UserModel from "../models/User.model.js";
const create = async (req, res) => {
    try {
        const order = new OrderModel({
            id: Math.floor(Math.random() * 1000000000),
            userId: req.body.userId,
            cartId: req.body.cartId,
            totalPrice: req.body.totalPrice,
            date: new Date(),
            city: req.body.city,
            street: req.body.street,
            creditCard: req.body.creditCard,
            shipping: req.body.shipping,
            self_pick_up:req.body.self_pick_up
        });
        const createdOrder = await order.save();

        // Fetch the user by userId
        const user = await UserModel.findOne({ userId: req.body.userId });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Add the new order to the user's orders array
        user.orders.push({
            orderId: order.id,
            totalPrice: order.totalPrice,
            date: order.date
        });

        // Save the updated user document
        await user.save();
         //save the new user..
        req.session.user=user

        res.status(201).send({ message: "New Order Created", order: createdOrder, user: user  });
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

const ordersGroupByUserId = (req, res) => {
    OrderModel.aggregate([{ $group: { _id: "$userId", totalAmount: { $sum: "$totalPrice" } } }]).then((orders) => {
        res.status(200).send(orders);
    }).catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Error in Fetching Orders Grouped By User" });
    });
};


export {
    remove, update, findAll, findOne, create, ordersGroupByUserId
}