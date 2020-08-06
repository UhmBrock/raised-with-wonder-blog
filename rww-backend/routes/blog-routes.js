"use strict";
exports.__esModule = true;
var db_connect_1 = require("../db_connect");
var router = require('express').Router();
var pool = db_connect_1["default"].getDatabaseConnection();
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', function (err, client) {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});
// /blog/all/ 
// ---- Get all blogs
router.get('/all/', function (req, res) {
    pool.query("SELECT * from blogs", [], function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result.rows);
        console.log("Sent blog posts");
    });
});
// /blog/top/{number}
// ---- Get the {number} most recent blogs
router.get('/top/:number', function (req, res) {
    pool.query("SELECT * FROM blogs ORDER BY date_created LIMIT $1", [req.params["number"]], function (err, result) {
        if (err) {
            throw err;
        }
        res.json(result.rows);
    });
});
// /blog/{title} 
// ---- Get a specific blog
router.get('/:blogTitle', function (req, res) {
    pool.query("SELECT * from blogs WHERE title=$1", [req.params["blogTitle"]], function (err, result) {
        if (err) {
            throw err;
        }
        if (result.rowCount === 0) {
            res.sendStatus(404);
        }
        res.json(result.rows[0]);
    });
});
exports["default"] = router;
