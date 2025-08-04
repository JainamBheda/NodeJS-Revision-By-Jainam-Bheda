const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
const SECRET_KEY = "my_secret_key";

app.use(bodyParser.json());
app.use(cookieParser());

// Dummy users with roles
const USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "jainam", password: "user123", role: "user" }
];

// LOGIN = Authentication step
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false // true in production with HTTPS
  });

  res.json({ message: "Login successful" });
});

// Middleware = Token verification
function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // user info from token
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Authorization middleware
function authorize(allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  };
}

// Profile route (any authenticated user)
app.get("/profile", authenticate, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}. Role: ${req.user.role}` });
});

// Admin-only route
app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome to the admin panel" });
});

// Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Home
app.get("/", (req, res) => {
  res.send("Auth Example with Roles");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
