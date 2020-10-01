const express = require('express');
const Order = require('../models/orderModel');
const Order_Product = require('../models/order_productModel');
const util = require('../util');

const router = express.Router();

router.get("/", async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
});

router.get("/:id", async (req, res) => {
    const order = await Order_Product.findOne({ order_id: req.params.id }).populate({path: 'order_id', populate: {path: 'order_id'}});
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: "order Not Found." });
    }
});

router.post("/", async (req, res) => {
    const order = new Order({
        price: req.body.price,
        user_id: req.body.user_id,
        user_name: req.body.user_name
    });
    const newOrder = await order.save();
    console.log(newOrder);
    const orderProudct = new Order_Product({
        orderInfo: req.body.orderInfo,
        numInfo: req.body.numInfo,
        order_id: order._id
    })
    const newOrderProduct = await orderProudct.save();
    if (newOrder && newOrderProduct) {
        return res.status(201).send({ message: 'New order created', data: newOrder });
    }
    return res.status(500).send({ message: ' Error in Creating order.' });
})

// create order test
router.get("/order", async (req, res) => {
    try{
        const order = new Order({
            orderInfo: "11",
            price: 11
        });
        const newOrder = await order.save();
        res.send({
            orderInfo: newOrder.orderInfo,
        });
    }catch(error){
        res.send({ msg: error.message });
    }

})
module.exports = router;
