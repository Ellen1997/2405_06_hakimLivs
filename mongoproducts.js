const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
        // _id: Number,
        name: String,
        price: Number,
        description: String,
        stock: Number,
}, { timestamps: true })

module.exports = mongoose.model("mongoproducts", productSchema)