const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //check user
    const { username, password } = req.body;
    var user = await User.findOne({ username });
    if (user) {
      return res.status(400).send("User Already Exists");
    }
    const salt = await bcrypt.genSalt(10);
    user = new User({
      username,
      password,
    });

    //encrype(เข้ารหัส)
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("register success!!");
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    var user = await User.findOneAndUpdate({ username }, { new: true });
    if (user && user.enabled) {
      //check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send("Password Invalid");
      }

      //Payload
      const payload = {
        user: {
          username: user.username,
          role: user.role,
        },
      };
      //Generate token
      jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token, payload });
      });
    } else {
      return res.status(400).send("User Not Found!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.currentUser = async(req,res)=>{
    try{
      // console.log('controller',req.user);
      const user = await User.findOne({username:req.user.username})
      .select('-password').exec();
      res.send(user)
    }catch(err){
      console.log(err);
      res.status(500).send("SERVER ERROR!");
    }
}




exports.listUser = async (req, res) => {
  try {
    res.send("list Get User");
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.editUser = async (req, res) => {
  try {
    res.send("edit User");
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.send("remove User");
  } catch (err) {
    console.log(err);
    res.status(500).send("SERVER ERROR!");
  }
};

exports.createAndUpdateUser = async(req,res)=>{
  // const roitai = 'hello controller'
  // const A = 'ฝากกดติดตามด้วยนะครับ'
  //   const obj = {
  //       name:'tam',
  //       location:[103.24,13.754]
  //   }
  // console.log('controller',req.user);  
  // res.json(roitai)
  const { name ,email } = req.user
  //console.log(name,email);
  const user = await User.findOneAndUpdate(
    { email },
    { name },
    { new:true},
  )
  if(user){
    console.log('User updated',user);
    res.json(user)
  } else {
    const newUser = await User({
      email,
      name
    }).save();
    console.log('Created USer',newUser);
    res.json(newUser);
  }
};

exports.currentUserAuthGoogle = async (req,res) => {
  try{
    const user = await User.findOne({email:req.user.email})
    .exec()
    res.send(user)
  }catch(err){
    console.log(err);
    res.status(400).send('SERVER ERROR')
  }
}
 