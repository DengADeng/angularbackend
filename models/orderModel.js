const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    date: {type:Date, default:Date.now},
    price: {type: Number,  default: "0",required:true},
    user_id: {type: String, ref:"User"},
    user_name: {type: String, required:true}
});

const orderModel = mongoose.model("Order", orderSchema);


module.exports= orderModel;
