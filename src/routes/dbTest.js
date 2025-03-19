const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.status(200).json({message: "connected till mongo atlas"})
    } catch (error) {
        res.status(500).json({message: "Mongo db connection fail", error})
    }
} );

module.exports = router;