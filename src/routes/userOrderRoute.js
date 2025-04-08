const express = require("express");
const Order = require('../models/userOrders.js');
const { authenticateToken, isAdmin } = require("../middleware/auth.js")

const router = express.Router();

// HÄR SKA DET VARA AUTHTOKEN OCH ISADMIN också (!!!)

router.get("/", async (req, res) => {
    try {
        const {status} = req.query;
        let query = {}

        if(status) {
            query.status = status
        }

    const orders = await Order.find(query)
    .sort({ createdAt: -1})
    .populate("user.userId", "username mobileNumber")
    
    res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Kunde inte hämta ordrar"})
    }
})

//HÄR måste vi ha authenticateToken från början annars funkar den inte eftersom req.user.id infon finns inne i token
router.get("/myOrders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ "user.userId": req.user.id}).sort({createdAt: -1});

        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Kunde ej hämta dina ordrar"})
    }
});

router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user.userId", "email");

        if (!order) {
            return res.status(404).json({ message: "Kunde ej hitta order"});
        }

        //VI LÄGGER IN NEDSTTÅENDE SEN!! nu måste vi ba kunna testa 
        //Vi ska ju även lägga till authenticateToken och isAdmin


        // const yourOrder = order.user.userId.toString()=== req.user.id;
        // const isAdmin = req.user.isAdmin;

        // if(!yourOrder && !isAdmin) {
        //     return res.status(403).json({message: "Du har ej behörighet att se denna order"})
        // }


        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Kunde ej hämta ordern"})
    
    }
});

//i post måste vi lösa så vi slipper skriva in total MANUELLT !!! vet ej hur ännu 
//typ i const order att total = price sum eller nått 

router.post('/', authenticateToken, async (req, res) => {
    try {
      const { products, total } = req.body;
  
      if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Produkter krävs för att lägga en order" });
      }
  
      const order = new Order({
        user: {
          userId: req.user.id, 
          email: req.user.email,
          mobileNumber: req.user.mobileNumber 
        },
        products,
        total,
      });
  
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Kunde inte skapa order' });
    }
  });



router.put('/:id', async (req, res) => {

    try {
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id, 
        {$set: req.body},
        {new: true, 
        runValidators: true}
    );

    if(!updatedOrder) {
        return res.status(404).json({ message: "Order hittades ej"});
    }

    res.status(200).json({ message: "Order uppdaterad:", updatedOrder});

    } catch (error) {
        console.error(error)
        res.status(400).json({message: "Uppdatering misslyckades!", error: error.message});
    }
});

router.delete("/:id", async (req, res) => {

    try {

        const deletedOrder = await Order.findByIdAndDelete(req.params.id);

        if(!deletedOrder) {
            return res.status(404).json({message: "Orden hittades ej"});
        }
        res.json({message: "Orden borttagen:", deletedOrder})
    } catch (error) {
        res.status(500).json({message: "Kunde inte ta bort order"});
    }
});


module.exports = router;