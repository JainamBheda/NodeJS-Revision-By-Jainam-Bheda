const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
const SECRET_KEY = "123456789";

app.use(bodyParser.json());
app.use(cookieParser());

// Dummy user (you can replace this with DB logic)
const USER = {
  username: "admin",
  password: "1234"
};

// Login route - creates JWT and sends it in a cookie
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false // Set to true in production (HTTPS)
    });
    res.json({ message: "Logged in successfully" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware to protect routes
function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Protected route
app.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! This is your profile.` });
});

// Logout route
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Stateless Auth Example");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
