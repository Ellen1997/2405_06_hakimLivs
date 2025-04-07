const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true,
        default: ''
      }

    }, {timestamps: true});

module.exports = mongoose.model("category", categorySchema)
