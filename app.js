const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const passport = require("passport");

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const path = require("path");


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to mongoDB"))
    .catch(err => console.log(err));


// app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require("./config/passport")(passport);

// app.get("/", (req, res) => {
//     const user = new User({
//         handle: "Jim",
//         email: "jim@gmail.com",
//         password: "jimisgreat123"
//     });
//     user.save();
//     console.log(res);
//     res.send("Hello a/A!");
// });

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());


app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Listening on port ${port}`)});