const express = require("express");
const dotenv = require("dotenv");
const app = express();
const session = require("express-session");
dotenv.config({path: './config.env'});
var cors = require("cors");
const path = require("path");
const port = process.env.PORT || 5000;

require("./database");

const secret = process.env.SECRET;

app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session(
    {
        secret: secret,
        resave: true,
        saveUninitialized: false,
        proxy: true,
        withCredentials: true
    }
))

app.use("/login", require("./routes/loginRoute"));
app.use("/logout", require("./routes/logoutRoute"));
app.use("/register", require("./routes/registerRoute"));
app.use("/todo", require("./routes/todoRoute"));
app.use("/auth", require("./routes/auth"));

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})