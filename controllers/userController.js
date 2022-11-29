
const usermodel                  = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");




//   exports.userloginn = function(req, res) {
//     passport.authenticate("local", {
//         successRedirect: "/",
//         failureRedirect: "/"
//       })
//   }



exports.userform = (req, res) => {
    res.render("userform");
}

exports.userlogin=(req, res)=>{
    res.render("login");
} 
 


exports. user =
[
    body("fullname")
        .trim()
        .isLength({ min: 6 }),
    body("username")
        .isEmail()
        .withMessage("Email must be a valid email"),
    body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password length is short, min 6 char is required"),
    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password do not match')
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("------------",errors);
            res.render("userform", {
                user: req.body,
                errors: errors.array(),
             }
             );
             console.log(errors);
             res.send();
            // res.redirect("/users/userform");
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
                })
            }
          });
    }];

  