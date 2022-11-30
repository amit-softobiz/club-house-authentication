const msgmodel = require("../models/messagemodel");

exports.msgform = (req, res) => {
  res.render("messageform");
};

exports.msgpostform = (req, res, next) => {
  const user = req.user;
  const msg  = new msgmodel({
    author  : user.fullname,
    title   : req.body.title,
    message : req.body.message,
  });
  msg.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
