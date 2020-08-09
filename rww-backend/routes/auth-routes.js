"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
// /auth/login
// ---- Login Page
router.get('/login', function (req, res) {
    res.json('logging in');
});
// /auth/logout
// ---- Auth logout
router.get('/logout', function (req, res) {
    res.json('logging out');
});
// /auth/google
// ---- Auth with google
router.get('/google', function (req, res) {
    console.log('sending google');
    res.json('Logging in with Google');
});
// /auth/facebook
// ---- Auth with facebook
router.get('/facebook', function (req, res) {
    res.json('Logging in with Facebook');
});
exports["default"] = router;
