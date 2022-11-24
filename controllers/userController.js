const usermodel                  = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
exports.userform = (req, res) => {
    res.render("userform");
}

exports.userlogin=(req, res)=>{
    res.render("login");
} 

exports.userloginn = function(req, res) {
    res.redirect('/');  
  }




// async (req, res, next) => {
// //    try{
// //         let data = await usermodel.find({})
// //    }catch(err){
// //         console.log(err.message);
// //    }

//     };


exports.user =
[
    body("fullname")
        .trim()
        .isLength({ min: 6 }),
    body("email")
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
                    email: req.body.email,
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

  