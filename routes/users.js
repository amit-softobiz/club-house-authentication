var express = require('express');
const passport=require("passport-local")
let userController= require("../controllers/userController");
const middle = require("../authentication/middleware");
var router = express.Router();


/* GET users listing. */
// let middile = passport.authenticate('local', { failureRedirect: '/loginform' })

router.post('/userform',userController.user);
router.get('/userform',userController.userform);
router.post('/loginform',middle.data(),userController.userloginn);
router.get('/loginform',userController.userlogin);

module.exports = router;
