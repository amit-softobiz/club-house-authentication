const express    = require("express");
const msgmodel   = require("../models/messagemodel");
const router     = express.Router();

router.get("/", async function (req, res, next) {
  const data = await msgmodel.find({});
  res.render("index", { title: "Club House", user: req.user, data });
});

router.post("/users/delete/:id", async function (req, res, next) {
  const data = await msgmodel.find({});
  if (req.user.admin == true) {
    const id   = req.params.id;
    const data = await msgmodel.deleteOne({ _id: id });
    res.redirect("/");
  }
});

module.exports = router;
