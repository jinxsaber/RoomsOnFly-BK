const express = require('express')

const router = express.Router();

const {getRegister,postRegister,getLogin,postLogin, logout} = require('../controllers/authController');

const requireAuth = require('../middleware/auth')

router.get('/register',getRegister);

router.post('/register',postRegister);

router.get('/login',getLogin);

router.post('/logout',logout);

router.get('/dashboard', requireAuth, (req, res) => {
    res.json({ message: `Welcome User ID: ${req.user}` });
});

module.exports = router;


