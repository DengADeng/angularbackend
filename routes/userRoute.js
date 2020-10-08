const util = require('../util');
const isAdmin = util.isAdmin;
const express = require('express');
const User = require('../models/userModel');
const getToken = require('../util').getToken;

const router = express.Router();

//sign in
router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });
  if(signinUser){
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    })
  }else{
    res.status(200).send({mgs: "Invalid Email or Password."});
  }
})

router.post("/register", async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await user.save();
    if(newUser){
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser)
      });
      res.status(200).send({mgs: "User has created successfully."});
    }else{
    res.status(401).send({mgs: "Invalid User Data."});
  }
})

// create user
router.get("/createadmin", async (req, res) => {
  try{
    const user = new User({
      name: 'Lin1',
      email: 'lin11@gmail.com',
      password: '1234',
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser)
    });
  }catch(error){
     res.send({ msg: error.message });
  }

})

router.get("/user", async (req, res) => {
  try{
    const users = await User.find({});

    res.send(users);
  }catch(error){
     res.send({ msg: error.message });
  }

})

router.get("/user/:id", async (req, res) => {
  try{
    const user = await User.find({
      _id : req.params.id
    });
    if(user){
      res.send(user);
    }else{
      res.status(400).send({ message: 'user not exist'})
    }

  }catch(error){
    res.send({ msg: error.message });
  }

})

router.get("/checkemail/:email", async(req,res) =>{
  try{
    const email = await User.findOne({
      email : req.params.email
    });
    if(email){
      res.send({message: 'email exists'});
    }else{
      res.send({message: 'valid email'});
    }
  }catch(error){
    res.send({ msg: error.message });
  }
})
module.exports = router;
