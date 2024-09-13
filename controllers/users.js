const User = require("../models/user.js");

module.exports.renderSignUpForm=(req, res) => {
    res.render("users/signup.ejs");
  }
module.exports.SignUp=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "welcome to CozyCue");
      res.redirect("/listings");
      })
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }

module.exports.renderLoginForm= (req, res) => {
    res.render("users/login.ejs");
  }

module.exports.login=async (req, res) => {
    req.flash("success","welcome back to wanderlust! you successfully logged in.....!");
    res.redirect(res.locals.redirectUrl || "/listings");
  }

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","you are logged out!");
      res.redirect("/listings");
    })
  }