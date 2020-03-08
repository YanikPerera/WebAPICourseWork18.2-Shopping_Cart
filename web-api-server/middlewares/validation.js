var express = require("express");
var cors = require("cors");
var validation = express();

validation.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["Content-Type"]
}));

validation.get("/", function(req, res) {
    res.json({
        status: "My API is alive!"
    });
});



module.exports = validation;