// JWT - JSON Web Token Authentication (Stateless)

// Flow:
// 1. User logs in
// 2. Server verifies credentials and creates a token (JWT)
// 3. Token is sent to the client and stored (localStorage/cookie)
// 4. Client sends token in header on each request
// 5. Server verifies token and grants access

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;
const SECRET_KEY = "mysecretkey"; // In production, use .env file

app.use(express.json()); // Parses incoming JSON requests

// Dummy user (replace with DB lookup in real use)
const user = {
  id: 1,
  email: "test@example.com",
  password: "123456"
};

// 🔐 Login Route - Generates JWT
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// 🔍 Middleware to Verify JWT
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader && bearerHeader.startsWith("Bearer ")) {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded; // Attach decoded user info to request
      next();
    });
  } else {
    res.status(403).json({ message: "No token provided" });
  }
}

// 🛡️ Protected Route
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is your dashboard!` });
});

// 🚀 Server Start
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
