const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;  // Para copiar diretórios de forma recursiva

// Caminho para a pasta 'uploads'
const source = path.join(__dirname, 'src', 'backend', 'uploads');
const destination = path.join(__dirname, 'dist', 'uploads');  // Definindo o destino, por exemplo, a pasta dist/uploads

// Verificar se o diretório existe
if (!fs.existsSync(source)) {
  console.error('Diretório uploads não encontrado em src/backend');
} else {
  console.log('Diretório encontrado:', source);
  
  // Copiar a pasta 'uploads' para o destino
  ncp(source, destination, (err) => {
    if (err) {
      return console.error('Erro ao copiar a pasta uploads:', err);
    }

    console.log('Pasta uploads copiada com sucesso para o destino');
  });
}
