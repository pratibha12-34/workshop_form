const express = require("express");
const authrouter = express.Router();
const authcontroller = require('../../controllers/authcontroller');

authrouter.post("/register",authcontroller.userregister);

module.exports = authrouter;