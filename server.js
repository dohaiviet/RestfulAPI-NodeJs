require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const username = process.env.MONGOOSE_DB_USERNAME;
const password = process.env.MONGOOSE_DB_PASSWORD;
const port = process.env.PORT;
const uri = `mongodb+srv://${username}:${password}@cluster0.aznnm12.mongodb.net/?retryWrites=true&w=majority`;
const productRoute = require('./routers/productRouter');
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require('cors');

app.use(cors());
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

app.use('/api/v1/products', productRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(errorMiddleware);





