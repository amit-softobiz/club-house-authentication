const { body, validationResult } = require("express-validator");
const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");

membershippost = async (req, res)=>{
  if(req.body===membershipcode){
  const member = await usermodel.findByIdAndUpdate({_id:req.user._id},{membership_status:true});
    }else{
      res.send("not a valid code");
    }
    // const updatemember = await usermodel.updateOne()
}
membership = (req, res)=>{
  res.render("membership");
}
userform = (req, res) => {
  res.render("userform");
};

userlogin = (req, res) => {
  res.render("login");
};

user = [
  body("fullname").trim().isLength({ min: 6 }).withMessage("please enter full name"),
  body("username").isEmail().withMessage("Email must be a valid email"),
  body("password")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password length is short, min 6 char is required"),
  body("password2").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("password do not match");
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("userform", {
        user: req.body,
        errors: errors.array(),
      });
      return;
    }
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log("something went wrong with the hashing");
      } else {
        const user = new usermodel({
          fullname: req.body.fullname,
          username: req.body.username,
          password: hashedPassword,
          /// membership_status: req.body.membership_status,
        });
        user.save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/users/loginform");
        });
      }
    });
  },
];

module.exports = {
  userform,
  userlogin,
  user,
  membership,
  membershippost
};
