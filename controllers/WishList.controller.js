import WishList from '../models/WishList.model.js';

const create = async (req, res) => {
    try {

        const user = new User({
           userId: req.body.userId,
            products:req.body.products
        });
        user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the wish list."
            });
        });
    } catch (error) {
        console.log("error");
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the wish list."
        });
    }
};

const findAll = (req, res) => {
    WishList.find()
        .then(wishlists => {
            res.send(wishlists);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving wishlists."
        });
    });
};

const findOne = (req, res) => {
    WishList.find({ userId: req.params.id }).then(wishlist => {
            res.send(wishlist);
        }
    ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving wishlist."
            });
        }
    );
};

const update = (req, res) => {
    console.log(req.params.id);
    WishList.findOneAndUpdate({ userId: req.params.id }, req.body, { new: true }).then(wishlist => {
            res.send(wishlist);
        }
    ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving wishlists."
            });
        }
    );
};

const remove = (req, res) => {
    console.log(req.params.id);
    WishList.findOneAndDelete({ idNumber: req.params.id }).then(wishlist => {
            res.send(wishlist);
        }
    ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving wishlists."
            });
        }
    );
}



export {
    create,
    update,
    findOne,
    findAll,
    remove
}