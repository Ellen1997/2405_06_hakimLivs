const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
        // _id: Number,
        name: {
                type: String,
                required: true,
                trim: true
              },
        
        price:  {   
                type: Number,
                required: true,
                min: 0},
        description: {
                type: String,
                required: true,
                min: 10,
        },
        stock: {
                type: Number,
                require: true, 
        },
        category: { 
                type: String,
                require: true,
        }
}, { timestamps: true })

module.exports = mongoose.model("mongoproducts", productSchema)