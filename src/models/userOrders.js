const mongoose = require('mongoose');

const userOrderSchema = new mongoose.Schema({ 
    user: {
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true },
        email: { type: String, required: true },
        mobileNumber: {type: String, required: true}
        
      },
      products: [{
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "mongoproducts" },
        name: String,
        price: Number,
        quantity: Number,
      }],
      total: { type: Number, required: true },
      status: { type: String, enum: ['pending', 'paid', 'shipped'], default: 'pending' },
      createdAt: { type: Date, default: Date.now }
    }, {timestamps: true} )

module.exports = mongoose.model("orders", userOrderSchema);