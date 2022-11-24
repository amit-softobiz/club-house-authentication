const passport = require("passport");

exports.data = function auth(){
    return function(req, res, next){
        passport.authenticate("local", {
            successRedirect: "",
            failureRedirect: "/users/userlogin"
           })
          return next()
    }
}



// function authenticationMiddleware () {
//     return function (req, res, next) {
//         console.log("in middle ware =================");
//       if (req.isAuthenticated()) {
//         return next()
//       }
//       res.redirect('/')
//     }
//   }


  
// app.post(
//     "/log-in",
//     passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/"
//     })
//   );