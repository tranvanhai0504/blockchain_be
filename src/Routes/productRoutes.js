// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const Product = require('../Schema/product');

// Định nghĩa route để lấy thông tin sản phẩm
router.get('/all/:userWalletId', async (req, res) => {
    const { userWalletId } = req.params;
    try {
        const products = await Product.find({ userWalletId });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for the specified userWalletId.' });
        }

        res.json({
            data: products,
            message: 'Get all products for the specified userWalletId',
            code: 200,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/add', async (req, res) => {
    const { name, price, description, userWalletId } = req.body;
    try {
        const product = new Product({ name, price, description, userWalletId });
        const newProduct = await product.save();
        res.status(201).json({
            data: newProduct,
            code: 200,
            message: 'Add new product successfully!',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// Define the route to update a product by ID
router.put('/edit/:productId', async (req, res) => {
    const { name, price, description, userWalletId } = req.body;
    const { productId } = req.params;

    try {
        // Find the existing product by its ID
        const existingProduct = await Product.findOne({ id: productId });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        // Update the existing product with new values
        existingProduct.name = name;
        existingProduct.price = price;
        existingProduct.description = description;
        existingProduct.userWalletId = userWalletId;

        // Save the updated product
        const updatedProduct = await existingProduct.save();

        res.status(200).json({
            data: updatedProduct,
            code: 200,
            message: 'Product updated successfully!',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Define the route to get details of a product by ID
router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
        const existingProduct = await Product.find({ id: productId });

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        // Return the details of the existing product
        res.status(200).json({
            data: existingProduct,
            code: 200,
            message: 'Product details retrieved successfully!',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
