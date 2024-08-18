const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


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
  ];

  const { rollnumber, password } = req.body;

  const user = users.find(
    (user) => user.rollnumber === rollnumber && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Invalid roll number or password" });
  }
});

app.post("/complaints", upload.single("attachment"), (req, res) => {
  const { complaint } = req.body;
  const attachment = req.file ? req.file.path : null;

  console.log("Complaint:", complaint);
  console.log("File:", attachment);
  res.status(200).json({ message: "Complaint received successfully" });
});

app.listen(3000, () => {
  console.log("listening on port 3000..");
});
