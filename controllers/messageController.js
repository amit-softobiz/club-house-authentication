const msgmodel = require('../models/messagemodel');
// const { body, validationResult } = require("express-validator");

exports.msgform = (req, res) => {
  // console.log("user ", req.username);
    res.render("messageform");
  };

exports.msgpostform =
// [
//     body("title").not().trim().isLength({ max: 20 }).withMessage("max length is 20"),
//     body("message").not().trim().isLength({ max: 50 }).withMessage("max length is 50"),
// ,
(req, res, next) => {
    // const {title, message}= req.body;
    const user = req.user;
      const msg = new msgmodel({
      
        author : user.fullname,
        title  : req.body.title,
        message: req.body.message,
      });
      msg.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}
// ];  

// module.exports = {
//     msgform,
//     msgpostform,
// };