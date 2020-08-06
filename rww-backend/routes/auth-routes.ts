const express = require('express');

const router = express.Router();

// /auth/login
// ---- Login Page
router.get('/login', (req: any, res: any) => {
    res.json('logging in');
});

// /auth/logout
// ---- Auth logout
router.get('/logout', (req: any, res: any) => {
    res.json('logging out');
});

// /auth/google
// ---- Auth with google
router.get('/google', (req: any, res: any) => {
    console.log('sending google');
    res.json('Logging in with Google');
});

// /auth/facebook
// ---- Auth with facebook
router.get('/facebook', (req: any, res: any) => {
    res.json('Logging in with Facebook');
});

export default router;