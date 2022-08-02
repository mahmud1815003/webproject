const decorateHtmlResponse = (page_title) => {
    return (req,res,next) => {
        res.locals.html = true;
        res.locals.title = page_title + ' - ' + process.env.app_name;
        res.locals.loggedInUser = {};
        res.locals.errors = {};
        res.locals.data = {};
        next(); 
    }
}

module.exports = {
    decorateHtmlResponse,
}