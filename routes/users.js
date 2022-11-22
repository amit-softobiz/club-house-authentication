var express = require('express');
let userController= require("../controllers/userController");

var router = express.Router();

/* GET users listing. */

router.post('/userform',userController.user);
router.get('/userform',userController.userform);
module.exports = router;
