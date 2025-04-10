const mongoose = require("mongoose");

 
const productSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true 
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        description: {
          type: String,
          required: true,
          default: ''
        },
        stock: {
          type: Number,
          default: 0,
          required: true,
          min: 0
        },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "category", 
          required: true
        },

        img: {
          type: String,
          required: true
        }
      }, {
        timestamps: true
      })        
        module.exports = mongoose.model("mongoproducts", productSchema)