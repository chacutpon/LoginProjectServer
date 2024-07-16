const express = require("express");
const { createAndUpdateUser, currentUser, currentUserAuthGoogle } = require("../controllers/auth");
const { authCheck } = require("../middleware/auth");
const router = express.Router();




//@Endpoint http://localhost:5000/api/product
//@Method  GET
//@Access  Public
router.post('/product', authCheck,createAndUpdateUser)
router.post('/current-userAuthen', authCheck,currentUserAuthGoogle)


  

    

module.exports = router;