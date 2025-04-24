
import axios from 'axios';
import * as XLSX from "xlsx"; // Usado para o suporte a arquivos do Excel
import "./styles.css";  // Importação do CSS externo

export default {
	data() {
		return {
			formatos: [".csv", ".xlsx", ".json"],
			arquivoCarregado: null,
			arquivoSelecionado: null,
			mensagem: null,
			mensagemCor: "gray",
			arquivosArmazenados: new Map(),
			tela: "inicio"
		}
	},
	mounted() {
		// carrega como array e converte para map
		const arquivosSalvos = localStorage.getItem("arquivosArmazenados");
		if(arquivosSalvos) {
			JSON.parse(arquivosSalvos).forEach(element => {
				this.arquivosArmazenados.set(element.name, element.content);
				//console.log(`Encontrado: "${element.name}", tamanho: ${element.content.length}`);
			});
		}
	},
	methods: {
		// Botões
		mudarTela(tela) {
			this.mensagem = null;
			this.mensagemCor = "gray";
			this.arquivoSelecionado = null;
			this.tela = tela;
		},
		voltarPressionado(event) {
			this.arquivoCarregado = null;
			this.mensagem = null;
		},
		//Modificar
		arquivoEnviado(event) {
			const file = event.target.files[0];
			if (!file) return;

			const fileExtension = file.name.split(".").pop();
			if(this.formatos.includes("." + fileExtension.toLowerCase())) {
				this.arquivoSelecionado = file;
			}
		},
		enviarBDPressionado(event){
			console.log("Botão pressionado");
			this.mensagem = "Enviando para o banco de dados...";
			this.mensagemCor = "blue"; 
			this.enviarBDSelecionado = true; 

			if (this.arquivoSelecionado) {
				console.log("Condição Verificada");
				try {
					this.enviarDadosParaBD(this.arquivoSelecionado);
					this.mensagem = "Dados enviados com sucesso!";
					this.mensagemCor = "green"; 
				} catch (error) {
					this.mensagem = "Erro ao enviar dados.";
					this.mensagemCor = "red"; 
				}
			} else {
				this.mensagem = "Nenhum dado para enviar.";
				this.mensagemCor = "orange";
			}
		},

		// Armazena arquivo selecionado e salva no cache
		uploadArquivo(event) {
			const file = event.target.files[0];
			if (!file) {
				this.mensagem = "Operação cancelada.";
				this.mensagemCor = "gray";
				return;
			}

			const fileName = file.name;
			const fileExtension = fileName.split(".").pop();
			if(!this.formatos.includes("." + fileExtension.toLowerCase())) {
				this.mensagem = "Este formato de arquivo não é permitido! Use apenas: " + this.formatos.join(", ");
				this.mensagemCor = "red";
				return;
			}

			this.mensagem = "Carregando...";
			this.mensagemCor = "gray";
			let acao = this.arquivosArmazenados.has(fileName) ? "sobreescrito" : "carregado";

			const reader = new FileReader();
			if(fileExtension.toLowerCase() == "xlsx") {
				// Salva XLSX como Base64 para evitar corrupção de dados
				reader.onload = () => {
					const readerResult = new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), "");
					this.arquivosArmazenados.set(fileName, btoa(readerResult));
					this.mensagem = `Arquivo "${fileName}" ${acao} com sucesso!`;
					this.mensagemCor = "green";
					this.salvar();
				}
				reader.readAsArrayBuffer(file);
			} else {
				reader.onload = () => {
					this.arquivosArmazenados.set(fileName, reader.result);
					this.mensagem = `Arquivo "${fileName}" ${acao} com sucesso!`;
					this.mensagemCor = "green";
					this.salvar();
				}
				reader.readAsText(file);
			}
		},

		// Apaga arquivo selecionado depois de confirmação
		apagarArquivo(event) {
			this.arquivosArmazenados.delete(this.arquivoCarregado);
			this.arquivoCarregado = null;
			this.salvar();
		},

		// Faz parse do(s) arquivo(s) selecionado(s) e o(s) representa em forma de <li> e <ul>
		visualizarArquivo(event) {
			let data = "";
			// Suporte a JSON
			let jsonNum = 1;
			function recursivaJson(subdata) {
				if (Array.isArray(subdata)) {
					data += "<ul>";
					subdata.forEach((element) => {
						if(typeof element === "object") {
							data += `<li>#${jsonNum}:`;
							recursivaJson(element);
							data += "</li>";
							jsonNum++;
						}
						else {
							recursivaJson(element);
						}
					});
					data += "</ul>";
				} else if (typeof subdata === "object") {
					Object.entries(subdata).forEach(([key, value]) => {
						data += "<ul><li>";
						if(Array.isArray(value) || typeof value === "object")
						{
							data += `${key}:`;
							recursivaJson(value);
						}
						else data += `${key}: ${value}`;
						data += "</li></ul>";
					});
				} else {
					data += `<li>${subdata}</li>`;
				}
			}

			// Suporte a .XLSX e .CSV
			function visualizarPlanilha(linhas) {
				data += "<ul>";
				const nomeColunas = linhas[0].split(";");
				for (let i = 1 ; i < linhas.length ; i++) {
					let dados = linhas[i].split(";");
					if(dados.length <= 1 && dados[0] == "") continue;

					data += `<li>#${i}:<ul>`;
					for (let j = 0 ; j < dados.length ; j++) {
						data += `<li>${nomeColunas[j]}: ${dados[j]}</li>`;
					}
					data += "</ul></li>";
				}
				data += "</ul>";
			}

			// Carregar único arquivo ou lista
			let primeiro = true;
			function _carregar(content, name) {
				if(!primeiro) data += "<br>";
				data += `<li><strong>${name}</strong>`;
				switch(name.split('.').pop().toLowerCase()) {
					case "json": {
						recursivaJson(JSON.parse(content));
						jsonNum = 1;
						break;
					}
					case "xlsx": {
						// Converte Planilha XLSX para uma planilha simples CSV
						try {
							// Converte planilha salva em Base64 de volta para ArrayBuffer
							const binaryStr = atob(content);
							const len = binaryStr.length;
							const bytes = new Uint8Array(len);
							for (let i = 0; i < len; i++) {
								bytes[i] = binaryStr.charCodeAt(i);
							}
							const workbook = XLSX.read(bytes, { type: "array", cellText: true, cellDates: true });
							const primeiraPlanilha = workbook.SheetNames[0];

							const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[primeiraPlanilha], { header: 1 });
							const csv = jsonData.map(row => row.join(";"));
							visualizarPlanilha(csv);
						} catch (erro) {
							console.error("Erro ao converter XLSX para CSV:", erro);
						}
						break;
					}
					case "csv": {
						visualizarPlanilha(content.replace('\r\n', '\n').split('\n'));
						break;
					}
				}
				data += "</li>";
				primeiro = false;
			}

			if(this.arquivoCarregado == "*")
				this.arquivosArmazenados.forEach(_carregar);
			else
				_carregar(this.arquivosArmazenados.get(this.arquivoCarregado), this.arquivoCarregado);
			return data
		},

		// Salva arquivos armazenados no cache
		salvar() {
			// converte map para array e salva
			const arquivos = Array.from(this.arquivosArmazenados, ([name, content]) => ({ name, content }));
			localStorage.setItem("arquivosArmazenados", JSON.stringify(arquivos));
		},

	
		// Função para validar e enviar arquivo para a API
		enviarDadosParaBD(file) {			
			if (!file) {
				this.mensagem = "Operação cancelada.";
				return;
			}

			const fileName = file.name;
			const fileExtension = fileName.split(".").pop().toLowerCase();
			if (!this.formatos.includes("." + fileExtension)) {
				this.mensagem = "Este formato de arquivo não é permitido! Use apenas: " + this.formatos.join(", ");
				return;
			}

			this.arquivoSelecionado = file; // Usa diretamente a variável `file`
			this.enviarArquivo();  // Descomente se for chamar a função logo após a validação
		},

		async enviarArquivo() {
			if (!this.arquivoSelecionado) {
				this.mensagem = "Nenhum arquivo selecionado.";
				return;
			}

			const formData = new FormData();
			formData.append("file", this.arquivoSelecionado);

			try {
				const response = await axios.post("http://localhost:8080/api/files/upload", formData, {
					
					headers: {
						"Content-Type": "multipart/form-data",
					}
					
				});

				// Verificar a resposta
				console.log(response); // Para debug
				this.mensagem = `Upload realizado com sucesso! ${response.data}`; // Ajuste conforme a resposta esperada

			} catch (error) {
			console.error("Erro no upload 1 :", error);

			// Trate o erro
			this.mensagem = error.response
				? `Erro no upload 2: ${error.response.data.message || "Erro desconhecido"}`
				: "Erro na conexão com o servidor.";
			}
		}
	}
}