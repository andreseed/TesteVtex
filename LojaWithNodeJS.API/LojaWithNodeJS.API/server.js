//Dependencias
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to MongoLab
mongoose.connect('mongodb://userdbldogh:ldogh321@ds021994.mlab.com:21994/db_ldogh');

var controllers = require("./controllers");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

controllers.start(app);

var port = process.env.port || 1337;
http.createServer(app).listen(port);
console.log("Server rodando na porta 1337");