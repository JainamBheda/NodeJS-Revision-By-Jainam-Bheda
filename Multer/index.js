const path = require("path");
const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = 8000;

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Custom Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // store in 'uploads/' folder in project directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // preserve file extension
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileimage"), (req, res) => {
  console.log("Form Body:", req.body);
  console.log("Uploaded File:", req.file);
  return res.redirect("/");
});

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
