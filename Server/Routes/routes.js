const express = require('express')
const router = express.Router();
const { handleSignUp, handleLogin } = require('../Controller/Controller')

router.post('/signup', handleSignUp)
router.post('/login', handleLogin)

module.exports = router