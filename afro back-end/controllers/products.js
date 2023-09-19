const Product = require("../models/Product")

const createProduct = async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
}
const getProducts = async(req, res)=>{
    try {
        const {title, category, sort} =  req.query
        const queryObject = {}
        if(title){
            queryObject.title = {$regex: title, $options: "i"}
        }
        if (category) {
            queryObject.category = category
        }

        let result = Product.find(queryObject)

        if (sort) {
            sortAll = sort.split(",").join(" ")
            result = result.sort(sortAll)
        }else{
            result = result.sort("createdAt")
        }
        const product = await result
        res.status(200).json({count: product.length, product})    
    }catch (error) {
        res.status(500).json({error: error.message})
    }
    
}
const getProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const product = await Product.findById(id)
        res.status(200).json({product})    
    }catch (error) {
        res.status(500).json({error: error.message})
    }
    
}
const updateProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const product = await Product.findByIdAndUpdate({_id: id}, req.body, {new: true})
        res.status(200).json({product})    
    }catch (error) {
        res.status(500).json({error: error.message})
    }
}
const deleteProduct = async(req, res)=>{
    const {id} = req.params
    try {
        const product = await Product.findByIdAndDelete(id)
        res.status(200).json({product})    
    }catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {createProduct, getProducts, getProduct, updateProduct, deleteProduct}