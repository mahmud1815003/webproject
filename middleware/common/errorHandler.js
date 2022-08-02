const createError = require('http-errors');

const notFoundErrorHandler = (req,res,next) => {
    next(createError("The Request Resource is not Found"));
}

const defaultErrorHandler = (err,req,res,next) => {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : err.message;
    //console.log(err);
    if(res.locals.html){
        res.render("errors");
    }else{
        res.status(500).json({
            error: res.locals.error
        });
    }
}

module.exports = {
    notFoundErrorHandler,
    defaultErrorHandler,
}