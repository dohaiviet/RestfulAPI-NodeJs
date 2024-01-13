require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const username = process.env.MONGOOSE_DB_USERNAME;
const password = process.env.MONGOOSE_DB_PASSWORD;
const uri = `mongodb+srv://${username}:${password}@cluster0.aznnm12.mongodb.net/?retryWrites=true&w=majority`;
const port = 3000;
const Product = require("./models/productModel")

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(uri)
    .then(() => {
        console.log('connected to MongoDB')
        app.listen(port, () => {
            console.log(`App listening ion port ${port}`);
        });
    }).catch((error) => {
    console.log(error)
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: `Can not update product with id ${id}`})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if (!product) {
            return res.status(404).json({message: `Can not delete product with id ${id}`})
        }

        const products = await Product.find({});
        res.status(200).json(products);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
});



