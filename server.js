const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const nodemailer = require('nodemailer');
// const{check,validationResult} = require('express-validator');

const connectDB = require('./server/database/connection');
const { error } = require('console');
const e = require('express');

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
app.post('/',(req,res)=>{
    console.log(req.body)
    const transport =nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'yahye20025@gmail.com',
            pass: 'iioergnqtptxsbaw'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to:'yahye20025@gmail.com',
        subject: 'message from node js project',
        text: req.body.message
    }

    transport.sendMail(mailOptions , (error , info)=> {
        if (error) {
            console.log(error);
            res.send(error);

        }else{
            console.log('email sent:' +info.response)
            res.send('success');
        }

    })

})

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});