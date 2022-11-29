var express = require('express');
const msgmodel = require("../models/messagemodel")
const msgModel = require("../models/usermodel");
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const data = await msgmodel.find({});
  console.log("======",data);
  
  res.render('index', { title: 'Club House', user: req.user, data});
});

module.exports = router;
