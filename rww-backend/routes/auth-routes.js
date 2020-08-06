"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
// Auth login
router.get('/login', function (req, res) {
    res.json('logging in');
});
// Auth logout
router.get('/logout', function (req, res) {
    res.json('logging out');
});
// Auth with google
router.get('/google', function (req, res) {
    console.log('sending google');
    res.json('Logging in with Google');
});
// Auth with facebook
router.get('/facebook', function (req, res) {
    res.json('Logging in with Facebook');
});
exports["default"] = router;
