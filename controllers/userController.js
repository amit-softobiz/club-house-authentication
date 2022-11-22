const { body, validationResult } = require("express-validator");

const usermodel = require("../models/usermodel");

exports.userform = (req, res) => {
    res.render("userform");
}

exports.user = [
    body("fullname")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."),
    body("email")
        .trim()
        .isLength({ min: 10 })
        .escape(),
    body("password")
        .trim()
        .escape(),
    body("membership_status")
        .trim(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("userform", {
                user: req.body,
                errors: errors.array(),
            });
            return
        }

        const user = new usermodel({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            membership_status: req.body.membership_status,
        });
        user.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect("/");

        })
    }];