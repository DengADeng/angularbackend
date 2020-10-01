const mongoose = require('mongoose');
const orderProductSchema = new mongoose.Schema({
    orderInfo: {type: Array,  required:true, ref: "Product"},
    numInfo: {type: Array,  required:true},
    order_id: {type:String, ref: "Order"}
});

const orderProductModel = mongoose.model("Order_Product", orderProductSchema);


module.exports= orderProductModel;
