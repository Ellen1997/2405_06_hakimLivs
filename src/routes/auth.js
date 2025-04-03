const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require("../models/User.js");
const { authenticateToken, isAdmin } = require("../middleware/auth.js")


router.post('/register', async (req, res) => {
  try {
    const {username, email, password, isAdmin} = req.body;
   
    const user = new User({
      username, 
      email,
      password,
      isAdmin: isAdmin || false
    })

    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'qwerty123',
      {expiresIn: '1h'}
    );
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" }); 
    }

    console.log("Loggin in user:", user);

    
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'qwerty123',
      { expiresIn: '48h' }
    );

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

router.get('/protected', authenticateToken, (req, res) => {
res.json({message: "You have access!", user: req.user})

})

router.get('/admin-only', authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome, Admin!", user: req.user });
});


module.exports = router;