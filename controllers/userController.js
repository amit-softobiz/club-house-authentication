const usermodel                  = require("../models/usermodel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
exports.userform = (req, res) => {
    res.render("userform");
}
exports.userlogin=(req, res)=>{
    res.render("login");
} 

exports.userloginn = [
     body("email")
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email")
        .normalizeEmail()
        .toLowerCase()
        .isLength({ min: 10 })
        .escape(),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password length is short, min 6 char is required")
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("userform", {
                user: req.body,
                errors: errors.array(),
            });
            return;
        }
     

        // const user = new usermodel({
        //     fullname: req.body.fullname,
        //     email: req.body.email,
        //     password: req.body.password,
        //     membership_status: req.body.membership_status,
        // });
        // user.save((err) => {
        //     if (err) {
        //         return next(err);
        //     }
        //     res.redirect("/");
        // })

    }];


exports.user = [
    body("fullname")
        .trim()
        .isLength({ min: 6 })
        .escape(),
        // .isAlphanumeric()
        // .withMessage("First name has non-alphanumeric characters."),
    body("email")
        .trim()
        .isEmail()
        .withMessage("Email must be a valid email")
        .normalizeEmail()
        .toLowerCase()
        .isLength({ min: 10 })
        .escape(),
    body("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password length is short, min 6 char is required")
        .escape(),
    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('password do not match')
        }
        return true
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // res.render("login", {
            //     user: req.body,
            //     errors: errors.array(),
             //}
            //  );
            res.redirect("/");
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

  