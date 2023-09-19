const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "must provide name"],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, "must provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide valid email"
        ],
        unique: true
    },
    password:{
        type: String,
        required: [true, "must provide password"],
        minlength: 3
    }
})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})
userSchema.methods.createToken = function(){
    const token = jwt.sign({name: this.name, userId: this._id}, process.env.JWT, {expiresIn: "30d"})
    return token
} 
userSchema.methods.comparePassword = async function(password){
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}

module.exports = mongoose.model("User", userSchema)