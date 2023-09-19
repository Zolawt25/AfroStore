const User = require("../models/User")

const register = async(req, res)=>{
    try {
        const {name, email, password } = req.body
        const user = await User.create(req.body)

        const token = user.createToken()
        res.cookie('token', token);
        res.status(201).json({user, token})
    } catch (error) {
        if (error.code === 11000) {
            res.status(500).json({email: "email is already used"})
        }else{
            res.status(500).json({error: error.message})
        }
    }
}
const login = async(req, res)=>{
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(500).json({email: "you must provide email", password: "you must provide password"})
    }
    const user = await User.findOne({email})
    if (!user) {
        return  res.status(500).json({email: "email not found"})
    }
    const isPasswordMatch = await user.comparePassword(password)
    if(!isPasswordMatch){
        return res.status(500).json({password: "incorrect password"})
    }
    const token = user.createToken()
    res.cookie('token', token);
    res.status(201).json({user, token})
}

module.exports = {
    register,
    login
}