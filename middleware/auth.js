const jwt = require("jsonwebtoken")
const admin = require('../config/firebase')

exports.auth = (req,res,next) => {
    try{
        const token = req.headers["authtoken"]

        if(!token){
            return res.status('401').send('no token , authorization dinied')
        }
        const decoded = jwt.verify(token,"jwtSecret")
        console.log("middleware",decoded);
        req.user = decoded.user
        next()

    }catch(err){
        console.log(err);
        res.status(401).send('Token Invalid')
    }
}


exports.adminCheck = async(req,res,next) => {
    try{
        const { username } = req.user
        const adminUser = await User.findOne({username}).exec()
        if(adminUser.role !== 'admin'){
            res.status(403).send(err,'Admin Access Denied')
        }else{
            next()
        }

    }catch(err){
        console.log(err);
        res.status(401).send('Token Invalid')
    }
}

exports.teacherCheck = async(req,res,next) => {
    try{
        const { username } = req.user
        const teacherUser = await User.findOne({username}).exec()
        if(teacherUser.role !== 'teacher'){
            res.status(403).send(err,'Teacher Access Denied')
        }else{
            next()
        }

    }catch(err){
        console.log(err);
        res.status(401).send('Token Invalid')
    }
}
exports.authCheck = async(req,res,next)=>{  
  
    try{
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken)

        req.user = firebaseUser;
        // console.log('req.user',req.user)

        next();
    }catch(err){
        console.log(err);
        res.status(401).send('Token Invalid')
    }

}


