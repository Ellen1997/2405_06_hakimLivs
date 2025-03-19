const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dbTestRoute = require("./routes/dbTest.js");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5500;

mongoose.connect("mongodb+srv://ellenholmgren:Y71UhxXQpLUTf15J@expresscrash.vbreq.mongodb.net/?retryWrites=true&w=majority&appName=expresscrash")
.then(() => {
    console.log("connected to MongoDB ATLAS");
    app.listen(PORT, () => {
        console.log(`Servern är uppe och körs på http://localhost:${PORT}`)
    });
})
.catch ((e) => 
    console.error("MongoDB atlas connection error:", e)
);

app.use("/test-db", dbTestRoute);

app.use(express.static(path.resolve(__dirname, '..')));


app.get("/hej", (req, res) => {
    res.send("express servern/MongoDB är uppe")
});

app.get('/hem', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});




