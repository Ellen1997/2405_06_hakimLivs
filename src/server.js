const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mongproductsRoute = require("./routes/mongproducts.js");
const path = require("path");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://ellenholmgren:Y71UhxXQpLUTf15J@expresscrash.vbreq.mongodb.net/?retryWrites=true&w=majority&appName=expresscrash")
    .then(() => {
        console.log("Connected to MongoDB ATLAS");
    })
    .catch((e) =>
        console.error("MongoDB Atlas connection error:", e)
    );

app.use("/api/products", mongproductsRoute);

app.use(express.static(path.resolve(__dirname, '..')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'));
});


module.exports = app;