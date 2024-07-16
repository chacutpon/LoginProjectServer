const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
   //code
   const user = await User.find({}).select('-password').exec()
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.readUsers = async (req, res) => {
  try {
   //code
   const id = req.params.id
   const user = await User.findOne({_id:id}).select('-password').exec()
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
   //code
   var {id, password} = req.body.values
    // 1 gensalt
    const salt = await bcrypt.genSalt(10)
    // 2 encrypt
    var enPassword = await bcrypt.hash(password,salt)
     
    const user = await User.findOneAndUpdate(
      {_id: id},
      {password: enPassword})
      res.send(user)
  

  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
   //code
   const id = req.params.id
   const user = await User.findOneAndDelete(({_id:id}))
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
   //code
   console.log(req.body);
   const user = await User.findOneAndUpdate(
    {_id:req.body.id},
    {enabled:req.body.enabled})
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.changeRole = async (req, res) => {
  try {
   //code
   console.log(req.body);
   const user = await User.findOneAndUpdate(
    {_id:req.body.id},
    {role:req.body.role})
    res.send(user)

  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

