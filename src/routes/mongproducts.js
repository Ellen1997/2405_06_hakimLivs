const express = require("express");
const mongoproducts = require("../models/mongoproducts.js");
const Category = require("../models/category.js")


const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const categoryName = req.query.category;

        let query = {};
        if (categoryName) {
            const category = await Category.findOne({ name: categoryName });

            if (!category) {
                return res.status(404).json({ message: "Kategori hittades inte!" });
            }

            query = { category: category._id };
        }

        const products = await mongoproducts.find(query).populate("category");

        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: "Något gick fel", error: error.message });
    }
});

router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.q;

        if (!searchQuery) {
            return res.status(400).json({ message: "Skriv minst en bokstav för att söka efter produkter" });
        }

        const regex = new RegExp(searchQuery, 'i');

        const products = await mongoproducts.find({ name: { $regex: regex } }).populate("category");

        if (products.length === 0) {
            return res.status(404).json({ message: "Inga produkter matchade sökningen" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({ message: "Något gick fel vid sökningen", error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {

        const product = await mongoproducts.findById(req.params.id).populate("category");

        if (!product) {
            return res.status(404).send({message: 'Produkt inte hittad!'})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).send({message: 'Något gick fel', error})
    }
})


router.post('/', async (req, res) => {
    try {
        const {name, price, description, stock, category, img} = req.body;

        if (!name || !price || !description || !stock || !category || !img) {
            return res.status(400).json({ message: 'Fyll i alla fält för att skapa produkt' });
        }

        const categoryFound = await Category.findOne({name: category});

        if (!categoryFound) {
            return res.status(404).json({message: "Kategorin hittades ej"})
        }

        const newProduct = new mongoproducts({
            name,
            price,
            description,
            stock,
            category: categoryFound._id,
            img
        });


        await newProduct.save();
        res.status(201).send({ message: "Produkt skapad", product: newProduct });


    } catch (error) {
        res.status(500).send({ message: "Något gick fel, produkt ej inlagd", error: error.message});
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, category, img } = req.body;

        const product = await mongoproducts.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Produkt kunde ej hittas!' });
        }

        let categoryId = product.category;
        if (category) {
            const foundCategory = await Category.findOne({ name: category });
            if (!foundCategory) {
                return res.status(404).json({ message: 'Kategorin kunde ej hittas!' });
            }
            categoryId = foundCategory._id;
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = categoryId;
        product.img = img || product.img;

        await product.save();

        res.status(200).json({ message: 'Produkten uppdaterad!', product });

    } catch (error) {
        res.status(500).send({ message: 'Något gick fel', error });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await mongoproducts.deleteOne({_id: id})

        if (result.deletedCount === 0) {
            return res.status(404).json({error: 'Produkten hittas inte!'})
        }

        res.status(200).json({ message: 'Produkten borttagen' });

    }catch (error) {
        res.status(500).send({ message: "Något gick fel", error: error.message });
    }
})


module.exports = router;
 