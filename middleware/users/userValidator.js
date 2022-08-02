const {check, validationResult} = require('express-validator');
const People = require('../../Models/People');
const createError = require('http-errors');
const {unlink} = require('fs');
const path= require('path');

const userValidation = [
    check("name")
        .isLength({min: 1})
        .withMessage("The Name Must not be Blank and could not have anything but character")
        .isAlpha('en-US', {ignore: " - ."})
        .withMessage("The Name Must not be Blank and could not have anything but character"),
    check("password")
        .isStrongPassword()
        .withMessage("The Name Must not be Blank and could not have anything but character"),
    check("email")
        .isEmail()
        .withMessage("Enter a Valid Email")
        .custom(async (value) => {
            try{
                const data = await People.findOne({email: value});
                if(data){
                    throw createError("Email is Already Exists");
                }
            }catch(err){
                //console.log(err);
                throw createError(err.message);
            }
        }),
        check("mobile")
        .isMobilePhone('bn-BD', {strictMode: true})
        .withMessage("Enter a Valid Bangladesh Mobile Number (Ex: +880xxxxxxxxx)")
        .custom(async (value) => {
            try{
                const data = await People.findOne({mobile: value});
                if(data){
                    throw createError("Mobile is Already Exists");
                }
            }catch(err){
                //console.log(err);
                throw createError(err.message);
            }
        }),
        check("role")
        .custom(async (value) => {
            const roles = ['admin', 'patient', 'doctor'];
            if(!roles.includes(value.toLowerCase().trim())){
                throw createError("Enter a valid role");
            }
        }),

];

const userValidationResult = (req,res,next) => {
    const error = validationResult(req);
    const mappedError = error.mapped();
    //console.log(mappedError);
    if(Object.keys(mappedError).length > 0){
        if(req.files.length > 0){
            const {filename} = req.files[0];
            unlink(path.join(__dirname, `../../Public/uploads/avater/${filename}`),
            (err) => {
                if(err){
                    console.log(err.message);
                }
            })
        }
        res.status(500).json({
            errors: mappedError
        });
    }else{
        next();
    }
}

module.exports = {
    userValidation,
    userValidationResult
}