const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require("../models/User.js");
const { authenticateToken, isAdmin } = require("../middleware/auth.js")

router.get("/", async (req, res) => {
    try {
        const userName = req.query.User;
        const query = userName ? { username: userName} : {};

        const users = await User.find(query);
        res.status(200).json(users);
    }catch (error) {
        res.status(500).send({ message: "Något gick fel, kunde ej hämta användare", error: error.message });
    }
});

router.post('/register', async (req, res) => {
  try {
    const {username, email, mobileNumber, password, isAdmin} = req.body;
   
    const user = new User({
      username, 
      email,
      mobileNumber,
      password,
      isAdmin: isAdmin || false
    })

    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'qwerty123',
      {expiresIn: '96h'}
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {

  const { email, password} = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" }); 
    }

    console.log("Loggin in user:", user);

    
    const token = jwt.sign(
      { id: user._id, 
        isAdmin: user.isAdmin,
        email: user.email,
        mobileNumber: user.mobileNumber,
       },
      process.env.JWT_SECRET || 'qwerty123',
      { expiresIn: '48h' }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.put('/update', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; 
    
    const user = await User.findById(userId);

    if (req.body.username && req.body.username !== user.username) {
      const usernameFinnsRedan = await User.findOne({ username: req.body.username });
      if (usernameFinnsRedan) {
        return res.status(400).json({ error: "Användarnamnet är upptaget" });
      }
      user.username = req.body.username;
    }

    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ error: "Ett konto med denna mejladress finns redan" });
      }
      user.email = req.body.email;
    }

    if (req.body.mobileNumber !== undefined)
    user.mobileNumber = req.body.mobileNumber 

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "User uppdaterades",
      user: { username: user.username, email: user.email, mobileNumber: user.mobileNumber }
    });
  } catch (error) {
    res.status(500).json({ error: "Error vid uppdatering", message: error.message });
  }
});

router.delete('/delete', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const userDelete = await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'Ditt konto har tagits bort', deletedUser: userDelete });

  } catch (error) {
    res.status(500).send({ message: "Något gick fel vid borttagning", error: error.message });
  }
});

router.delete('/delete/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await User.findByIdAndDelete(id);

    if (!userDelete) {
      return res.status(404).json({ error: 'Användaren hittas inte!' });
    }

    res.status(200).json({ message: 'Användaren borttagen', deletedUser: userDelete });

  } catch (error) {
    res.status(500).send({ message: "Något gick fel vid borttagning", error: error.message });
  }
});


router.get('/protected', authenticateToken, (req, res) => {
res.json({message: "Välkommen, du har åtkomst!", user: req.user})

})

router.get('/admin-only', authenticateToken, isAdmin, (req, res) => {
  res.json({message: 'Välkommen Admin!'});
  
});




module.exports = router;