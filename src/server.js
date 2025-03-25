const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mongproductsRoute = require("./routes/mongproducts.js");
const path = require("path");
const mongoproducts = require("./models/mongoproducts.js");


dotenv.config();

const app = express();

// const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://ellenholmgren:Y71UhxXQpLUTf15J@expresscrash.vbreq.mongodb.net/?retryWrites=true&w=majority&appName=expresscrash")
    .then(() => {
        console.log("connected to MongoDB ATLAS");
        // app.listen(PORT, () => {
        //     console.log(`Servern är uppe och körs på http://localhost:${PORT}`);
        // });
    })
    .catch((e) =>
        console.error("MongoDB atlas connection error:", e)
    );

app.use("/products", mongproductsRoute);
app.use("/test-db", dbTestRoute);

app.use(express.static(path.resolve(__dirname, '..')));

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '__tests__', 'indexxx.html'));
}); 

module.exports = app;