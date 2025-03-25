const express = require("express");
const mongoproducts = require("../models/mongoproducts.js");


const router = express.Router();




//GET metod
router.get('/', async (req, res) => {
    try {
        const products = await mongoproducts.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({ message: "Något gick fel", error: error.message });
    }
});


//GET by ID
router.get('/:id', async (req, res) => {
    try {


        const product = await mongoproducts.findById(req.params.id);


        if (!product) {
            return res.status(404).send({message: 'Produkt inte hittad!'})
        }


        res.status(200).json(product);


    }catch (error) {
        res.status(500).send({message: 'Något gick fel', error})
    }
})

 // la in denna senare!!Detta är så man kan söka mellan kategorier, vi kommer behöva den sen. 
router.get("/", async (req, res) => {
    try {
        const category = req.query.category;
        const query = category ? { category: category} : {};

        const products = await mongoproducts.find(query);
        res.status(200).json(products);
    }catch (error) {
        res.status(500).send({ message: "Något gick fel", error: error.message });
    }
});

//POST
router.post('/', async (req, res) => {
    try {
        const {name, price, description, stock, category} = req.body;

        if (!name || !price || !description || !stock || !category) {
            return res.status(400).json({ message: 'Fyll i alla fält för att skapa produkt' });
        }

        const newProduct = new mongoproducts({
            name,
            price,
            description,
            stock,
            category
        });


        await newProduct.save();
        res.status(201).send({ message: "Produkt skapad", product: newProduct });


    } catch (error) {
        res.status(500).send({ message: "Något gick fel, produkt ej inlagd", error: error.message});
    }
});


//PUT
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, price, stock, category } = req.body;


        const product = await mongoproducts.findById(id)


        if (!product) {
            return res.status(404).json({message: 'Produkt kunde ej hittas!'})
        }


        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.stock = stock || product.stock;
        product.category = category || product.category;


        await product.save();


        res.status(200).json({message: 'Produkten uppdaterad!', product})


    }catch (error) {
        res.status(500).send({message: 'Något gick fel', error})
    }
})


//delete
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
