const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:id', getDetailProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;