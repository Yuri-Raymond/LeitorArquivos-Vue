const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const multer = require("multer");
const path = require("path");

// Configuração do multer para armazenar arquivos na pasta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// Middleware do multer para upload de arquivos
const upload = multer({ storage });

// Rota de upload
router.post("/", upload.single("arquivo"), uploadController.handleUpload);

// Exporta as rotas
module.exports = router;
