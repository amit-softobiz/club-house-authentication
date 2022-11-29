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

router.get('log-out', (req, res)=>{
  req.logout(function (err){
    if(err){
      return next(err);
    }
    res.redirect("/");
  })
})

module.exports = router;
