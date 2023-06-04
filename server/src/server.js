const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const loginController = require('./login/user.controller.ts')


dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/login', loginController)


app.listen(PORT, () => {
    console.log("Express API running in port : " + PORT)
})