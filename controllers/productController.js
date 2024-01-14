const Product = require("../models/productModel");
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(
    async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(200).json(product);
        } catch (e) {
            res.status(500);
            throw new Error(e.message);
        }
    }
);

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
})

const getDetailProduct = asyncHandler(
    async (req, res) => {
        try {
            const {id} = req.params;
            const products = await Product.findById(id);
            res.status(200).json(products);
        } catch (e) {
            res.status(500);
            throw new Error(e.message);
        }
    }
);

const updateProduct = asyncHandler(
    async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body);
            if (!product) {
                return res.status(404).json({message: `Can not update product with id ${id}`})
            }

            const updatedProduct = await Product.findById(id);
            res.status(200).json(updatedProduct);
        } catch (e) {
            res.status(500);
            throw new Error(e.message);
        }
    }
);

const deleteProduct = asyncHandler(
    async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findByIdAndDelete(id, req.body);
            if (!product) {
                return res.status(404).json({message: `Can not delete product with id ${id}`});
            }

            const products = await Product.find({});
            res.status(200).json(products);
        } catch (e) {
            res.status(500);
            throw new Error(e.message);
        }
    }
);

module.exports = {
    createProduct, getProducts, getDetailProduct, updateProduct, deleteProduct
}