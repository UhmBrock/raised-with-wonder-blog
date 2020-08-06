"use strict";
exports.__esModule = true;
var db_connect_1 = require("./db_connect");
var auth_routes_1 = require("./routes/auth-routes");
var blog_routes_1 = require("./routes/blog-routes");
var dotenv = require('dotenv');
var express = require('express');
var cors = require('cors');
var pool = db_connect_1["default"].getDatabaseConnection();
var app = express();
// Read in environment variables
dotenv.config();
// Enable Cross Origin Resource Sharing
app.use(cors());
// Authorization routes
app.use('/auth', auth_routes_1["default"]);
app.use('/blog', blog_routes_1["default"]);
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', function (err, client) {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
app.listen(process.env.SERVER_PORT, function () {
    console.log("App is listening on port " + process.env.SERVER_PORT);
});
