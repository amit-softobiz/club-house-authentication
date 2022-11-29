const express        = require('express');
const passport       = require("passport");
const userController = require("../controllers/userController");
const router         = express.Router();

router.post('/userform',userController.user);
router.get('/userform',userController.userform);

router.post("/loginform",
  passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/loginform"
}))

router.get('/loginform',userController.userlogin);

router.get('/log-out', (req, res)=>{

  req.logout(function (err){
    if(err){
      console.log("logout in if block ");
      return next(err);
    }
    console.log("logout in outside if block ");
    res.redirect("/");
  });
});

router.post('/membership',userController.membershippost);
router.get('/membership',userController.membership);

module.exports = router;
