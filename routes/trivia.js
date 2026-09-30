const express = require("express");
const router = express.Router();
const triviaController = require("../controllers/triviaController");

router.get("/", triviaController.obtenerTrivia);

module.exports = router;
