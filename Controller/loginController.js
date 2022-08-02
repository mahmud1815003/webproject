//External Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

//Internal Imports
const People = require('../Models/People');

const getLogin = (req,res,next) => {
    res.render("login");
}

const handleLogin = async (req,res,next) => {
    try{
        const userData = await People.find({
            $or: [{email: req.body.username}, {mobile: req.body.username}]
        });
        if(userData && userData._id){
            const passwordMatch = bcrypt.compare(req.body.password,userData.password);
            if(passwordMatch){
                const userObject = {
                    name: req.body.username,
                    email: userData.email,
                    mobile: userData.mobile,
                    role: userData.role,
                };
                //make jwt Token
                const token = jwt.sign(userObject,process.env.jwtsecret, {
                    expiresIn: process.env.validTime,
                });
                //set Cookie
                res.cookie(process.env.cookieName, token, {
                    maxAge: process.env.validTime,
                    httpOnly: true,
                    signed: true,
                });
                res.locals.loggedInUser = userObject;
                res.render("admin");
            }else{
                throw createError("Email/Mobile or Password is not Matched");
            }
        }else{
            
            throw createError("Email/Mobile or Password is not Matched");
        }
    }catch(err){
        console.log(err);
        res.render("login", {
            data:{
                username: req.body.username,
            },  
            errors: {
                common: {
                    msg: err.message,
                }
            }
        })
    }
}

module.exports = {
    getLogin,
    handleLogin,
}