const mongoose = require('mongoose');

const url = process.env.MONGOOSE_URL

const connectDB = async()=>{
        await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("connected to DB...")
    })
}

module.exports = connectDB