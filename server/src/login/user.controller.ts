// const express = require('express');
// const prisma = require('../db');

// const { loginAdmin } = require('./login.service')


// const router = express.Router();

// router.post('/', async (req, res) => {
//     const admin = loginAdmin()
//     res.send(admin)
// })

// module.exports = router

const express = require("express");
const prisma = require('../db');

const router = express.Router();


router.get('/', async (req, res) => {

})