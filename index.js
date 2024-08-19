const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Simulating a database for users and complaints
let complaints = [];

app.post("/login", (req, res) => {
  const users = [
    { rollnumber: "727621bit031", password: "15042004" },
    { rollnumber: "727621bit090", password: "26042004" },
    { rollnumber: "Dharani", password: "Kec" },
    { rollnumber: "727621bit016", password: "09012004" },
    { rollnumber: "727621bit053", password: "06042004" },
    { rollnumber: "727621bec301", password: "25102003" },
    { rollnumber: "727621bec013", password: "23052004" },
    { rollnumber: "727621bit031", password: "23052004" },
    { rollnumber: "mcetthead", password: "1234" }, // Admin credentials
  ];

  const { rollnumber, password } = req.body;

  const user = users.find(
    (user) => user.rollnumber === rollnumber && user.password === password
  );

  if (user) {
    if (rollnumber === "mcetthead" && password === "1234") {
      // Redirect to admin panel for admin user
      res.status(200).json({ message: "Admin login successful", isAdmin: true });
    } else {
      res.status(200).json({ message: "Login successful", isAdmin: false });
    }
  } else {
    res.status(400).json({ message: "Invalid roll number or password" });
  }
});

app.post("/complaints", upload.single("attachment"), (req, res) => {
  const { complaint } = req.body;
  const attachment = req.file ? req.file.path : null;

  const newComplaint = {
    id: complaints.length + 1,
    complaint,
    attachment,
  };

  complaints.push(newComplaint);

  res.status(200).json({ message: "Complaint received successfully" });
});

app.get("/admin/complaints", (req, res) => {
  res.status(200).json({ complaints });
});

app.listen(3000, () => {
  console.log("listening on port 3000..");
});
