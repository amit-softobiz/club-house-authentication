var express = require('express');
const msgmodel = require("../models/messagemodel")
// const userModel = require("../models/usermodel");
const mongoose = require("mongoose");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await msgmodel.find({});
  res.render('index', { title: 'Club House', user: req.user, data});
});

router.post("/users/delete/:id",async function(req, res, next){
  console.log("delete route");
  const data = await msgmodel.find({});
  if(req.user.admin == true){
    const id = req.params.id;
  console.log("delete id ", id)
  console.log("req.user", req.user);
    
    const data = await msgmodel.deleteOne({_id:id})
    res.redirect("/");
  }

})

module.exports = router;
