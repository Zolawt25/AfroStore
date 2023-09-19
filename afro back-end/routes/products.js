const express = require('express');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const router = express.Router()

router.get("/products", getProducts)
router.post("/product", createProduct)
router.get("/product/:id", getProduct)
router.put("/product/:id", updateProduct)
router.delete("/product/:id", deleteProduct)

module.exports = router