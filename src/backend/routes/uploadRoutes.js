const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");

// Rota para fazer upload de um arquivo
router.post("/upload", uploadMiddleware.single("arquivo"), uploadController.handleUpload);

module.exports = router;
