
const express = require("express");
const { getShopifyProduct } = require("../controllers/userController");


const { authenticateToken } = require("../middleware/validateToken.js");

const router = express.Router();

router.get("/", getShopifyProduct);

module.exports = router;