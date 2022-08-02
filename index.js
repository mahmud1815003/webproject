//External Imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');


//Internal Imports 
const { notFoundErrorHandler, defaultErrorHandler } = require('./middleware/common/errorHandler');
const indexRouter = require('./Router/indexRouter');
const loginRouter = require('./Router/loginRouter');
const adminRouter = require('./Router/adminRouter');


//Database Connection
mongoose.connect(process.env.database)
    .then(() => {
        console.log('The Database Connection Was Successful');
    })
    .catch(err => {
        console.log("Database Connection Error " + err);
    });

//Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.cookiesecret));

//Static Files
app.use('/Public', express.static(path.join(__dirname, '/Public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

//View Engine
app.set('view engine', 'ejs');


//Routing
app.use('/', indexRouter);
app.use('/user/login', loginRouter);
app.use('/admin', adminRouter);



//Error Handler
app.use(notFoundErrorHandler);
app.use(defaultErrorHandler);


app.listen(process.env.port, ()=> {
    console.log(`The Server listening on Port ${process.env.port}`);
})


