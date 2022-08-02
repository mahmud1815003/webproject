const {check, validationResult} = require('express-validator');


const loginValidator = [
    check("username")
        .isLength({min: 1})
        .withMessage("Enter Mobile/Email"),
    check("password")
        .isLength({min: 1})
        .withMessage("Enter Passoword")    
];

const loginValidatorResults = (req,res,next) => {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    if(Object.keys(mappedError).length === 0){
        next();
    }else{
        res.render("login", {
            data: {
                username: req.body.username,
            },
            errors: mappedError,
        });
    }
}

module.exports = {
    loginValidator,
    loginValidatorResults,
}