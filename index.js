const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const bodyParser = require('body-parser');
const app = express();

const mongodbUrl = config.MONGODB_URL;
//cors

//cors
app.use(function (req,res,next) {
    res.setHeader("Access-Control-Allow-Origin", "http://fuzhou123.s3-website.us-east-2.amazonaws.com");
    //res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Credentials",true);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers",  "X-Requested-With, Content-Type, Authorization");
    next();
})

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

mongoose.connection.on('connected', function() {
    console.log('MongoDB connected connected');
})
mongoose.connection.on("error",function(error){
    console.log("MongoDB connected connected failed:"+error);
});

app.get('/', function(res, rep) {
    rep.send('Hello, word!');
});
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.listen(3000);
