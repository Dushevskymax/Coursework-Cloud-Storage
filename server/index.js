require('dotenv').config()
const express = require('express');
const cors = require('cors');
const formidableMiddleware = require('express-formidable');
const mongoose = require('mongoose');
const errorMiddleware = require("./middlewares/error-middleware");
const router = require("./routers/router");
const app = express();

const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());
app.use('/api/upload', formidableMiddleware());
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start();

