"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var db_connect_1 = require("../db_connect");
var bodyParser = require('body-parser');
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
// /blog/upload
// ---- Write a blog to the database
router.post('/upload', bodyParser.json(), function (req, res) {
    var blogPost = req.body;
    // editing a blog if it already has an id
    var editMode = blogPost.id !== undefined;
    var queryString = "";
    var id = blogPost.id, allExceptID = __rest(blogPost, ["id"]);
    if (!editMode) { // Creating a new blog post
        var columns = Object.keys(allExceptID).join(", ");
        var values = Object.values(allExceptID).join("', '");
        queryString = "INSERT INTO blogs ( " + columns + " ) VALUES ( '" + values + "' );";
    }
    else { // Editing an existing blog post
        var setValues = [];
        for (var key in allExceptID) {
            setValues.push(key + "='" + allExceptID[key] + "'");
        }
        var setStatement = setValues.join(", ");
        queryString = "UPDATE blogs SET " + setStatement + " WHERE id=" + id;
    }
    pool.query(queryString, function (err, result) {
        if (err) {
            throw err;
        }
        if (result.rowCount > 0) {
            console.log("Saved blog: " + blogPost.title);
        }
    });
});
exports["default"] = router;
