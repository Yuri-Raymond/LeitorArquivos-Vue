const multer = require("multer");
const path = require("path");

// Definir onde os arquivos serão armazenados
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // Pasta onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));  // Nome único para o arquivo
  },
});

// Criar o middleware de upload com a configuração do multer
const upload = multer({ storage: storage });

module.exports = upload;
