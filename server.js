const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');

// const{check,validationResult} = require('express-validator');

const connectDB = require('./server/database/connection');

const app = express();
app.use(express.json());

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")

const viewapath= path.join(__dirname,'/views')
app.set('views',viewapath)

// app.set("views", path.resolve(__dirname, "views/ejs"))`

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))
app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/home', (req,res)=>{
    res.render('home')
})

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});