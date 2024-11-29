let express = require('express');
let router = express.Router();
const passport = require('passport');
let userModel = require('../model/user');
let User = userModel.User;

module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('./auth/login',
            {
                title: 'login',
                message: req.flash('LoginMessage'),
                displayName: req.user ? req.user.displayName : ''
            })
    }
    else {
        return res.redirect('/')
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        //Server error
        if (err) {
            return next(err);
        }

        // is a login error
        if (!user) {
            req.flash('loginMessage','AuthenticationError');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/movieslist');
        });
    })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
    //check if the user is not already logged in
    if (!req.user) {
        res.render('auth/register',
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : '',
            });
    }
    else {
        return res.redirect('/');
    }
};
module.exports.processRegisterPage = (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName,
    });

    // Attempt to register the new user
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.error("Error: Inserting the new user:", err);

            // Handle UserExistsError
            if (err.name === "UserExistsError") {
                req.flash("registerMessage", "Registration Error: User already exists.");
            } else {
                req.flash("registerMessage", "Registration Error. Please try again.");
            }

            // Re-render the registration page with the error message
            return res.render("auth/register", {
                title: "Register",
                message: req.flash("registerMessage"),
                displayName: req.user ? req.user.displayName : "",
            });
        }

        // Automatically log in the user after successful registration
        req.login(user, (err) => {
            if (err) {
                console.error("Error during auto-login:", err);
                return next(err);
            }

            console.log("Redirecting to /movieslist after successful registration.");
            return res.redirect("/movieslist"); // Redirect to movies list after registration
        });
    });
};

module.exports.performLogout = (req,res,next)=>
{  
    req.logout(function(err){
        if(err){
            return next(err);
        }
    })
    res.redirect('/');
}

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName:''
    });
}