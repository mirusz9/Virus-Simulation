"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Getting the parent directory
const splitRootDir = __dirname.split("\\");
splitRootDir.pop();
const rootDir = splitRootDir.join("\\");
app.set("view engine", "ejs");
app.set("views", rootDir);
app.use(express.static(rootDir));
app.get("/", (req, res) => {
    res.render("index.ejs");
});
app.use("*", (req, res) => {
    res.redirect("/");
});
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Listening on " + port);
    }
});
