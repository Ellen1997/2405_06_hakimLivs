const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Ej auth" });

  jwt.verify(token, process.env.JWT_SECRET || "qwerty123", (err, user) => {
    if (err) return res.status(403).json({ error: "Förbjuden åtkomst" });
    
    console.log("Decoded User:", user);
    
    req.user = user;
    next();
  });
};     

const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: "Förbjuden åtkomst - Admins endast" });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };