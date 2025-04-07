const express = require("express");
const category = require("../models/category.js");
const mongoproducts = require('../models/mongoproducts');
const { authenticateToken, isAdmin } = require("../middleware/auth.js")

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categoryName = req.query.category;
        const query = categoryName ? { name: categoryName} : {};

        const categories = await category.find(query);
        res.status(200).json(categories);
    }catch (error) {
        res.status(500).send({ message: "Något gick fel", error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const {name, description} = req.body;

        if (!name || !description) {
            return res.status(400).json({ message: 'Fyll i alla fält för att skapa kategori' });
        }

        const newCategory = new category({
            name,
            description,
        });

        await newCategory.save();
        res.status(201).send({ message: "Kategori skapad", category: newCategory });

    } catch (error) {
        res.status(500).send({ message: "Något gick fel, kategori ej inlagd", error: error.message});
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description } = req.body;


        const categoryUpdate = await category.findById(id)


        if (!categoryUpdate) {
            return res.status(404).json({message: 'Kategorin kunde ej hittas!'})
        }


        categoryUpdate.name = name || categoryUpdate.name;
        categoryUpdate.description = description || categoryUpdate.description;


        await categoryUpdate.save();


        res.status(200).json({message: 'Kategorin uppdaterad!', category: categoryUpdate})


    }catch (error) {
        res.status(500).send({message: 'Något gick fel', error})
    }
}) 

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const categoryDelete = await category.findByIdAndDelete(id)

        if (!categoryDelete) {
            return res.status(404).json({error: 'Kategorin hittas inte!'})
        }

        res.status(200).json({ message: 'Kategorin borttagen', deletedCategory: categoryDelete });

    }catch (error) {
        res.status(500).send({ message: "Något gick fel vid borttagning", error: error.message });
    }
})


module.exports = router;
