// Imports
const express = require("express");
const path = require("path");

//Creating express instance
const app = express();

// port configuration
const port = process.env.PORT || 4200;

// Makes the public folder as static
app.use(express.static(__dirname + '/dist/blog--frontend'));

app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/blog--frontend/index.html'));});

app.listen(port);
