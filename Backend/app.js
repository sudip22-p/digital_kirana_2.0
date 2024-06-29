const bodyParser = require('body-parser');
const multer = require('multer');

const express = require('express');
const passport = require('passport');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require('mongoose')

// For Environment File
require('dotenv').config()
// For passport Setup
require("./controller/auth/passport")(passport)

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    methods:"GET,POST,PUT,DELETE",
    credentials:true,
}))

// Configure express-session
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        ttl:14 * 24 * 60 *60 // = 14 days expiration
    })
}));

// Initialize Passport and use session support
app.use(passport.initialize());
app.use(passport.session());

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=> {
        if (file.fieldname === 'imageUrl') {
            cb(null, "../Frontend/Assets/Images/categories/trying");
        } else if(file.fieldname === 'promoImg'){
            cb(null, "../Frontend/Assets/Images/promotion");
        } else {
            cb(null, "../Frontend/Assets/Images/Products");
        }
    },
    filename:(req,file,cb) =>{
        cb(null,file.originalname)
    }
});
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null,true)
    } else {
        cb(null,false);
    }
}
const upload = multer(
    {
        storage:fileStorage,
        fileFilter:fileFilter
    }
)
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
const uploadFields = [
    { name: 'frontView' },
    { name: 'backView' },
    {name:'sideView'},
    {name:'topView'},
    {name:'imageUrl'},
    {name:'promoImg'}
    // Add more fields as needed
];
  
app.use(upload.fields(uploadFields));

const authRoutes = require('./routes/authRoute');
const adminRoutes = require("./routes/adminRoutes")
const pageRoutes = require("./routes/pageRoutes");

app.use("/auth",authRoutes);
app.use("/api",pageRoutes);
app.use("/admin",adminRoutes)

mongoose.connect(process.env.MONGO_URI).then((result) => {
    console.log("Connected To DataBase")
    app.listen(3000,()=>{
        console.log('Server running on http://localhost:3000')
    })
})
