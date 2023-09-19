const express = require('express');
require('dotenv').config();
const connectDB = require("./db/connect");
const userRouter = require('./routes/user');
const jwt = require("jsonwebtoken")
const productRouter = require('./routes/products');
const cookieParser = require("cookie-parser")
var cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/item", productRouter)

const start = async ()=>{
    await connectDB()
    app.listen(5000, () => {
        console.log(`Server started on 5000..`);
    });
}

start()