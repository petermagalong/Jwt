const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = 5001;

const authRouter = require("./routes/auth");
const verifyJWT = require("./middleware");

// middleware provided by express to parse incoming JSON requests.
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("MongoDB connected");
})
app.use(express.json());

//Authentication route
app.use('/auth', authRouter);


//decodeDetails Route
app.get('/decodeDetails', verifyJWT, (req, res) => {
    const { username , id } = req.user;
    res.json({ username , id });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})