<script>
import axios from 'axios';
import * as XLSX from "xlsx"; // Usado para o suporte a arquivos do Excel
export default {
	data() {
		return {
			formatos: [".csv", ".xlsx", ".json", ".xml"],
			armazenadoMsg: null,
			armazenadoCor: "gray",
			lerSelecionado: false,
			apagarSelecionado: false,
			enviarSelecionado: false,
			arquivoCarregado: null,
			arquivoSelecionado: null,
			mensagem: null,
			mensagemCor: "gray",
			arquivosArmazenados: new Map()
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
		lerPressionado(event) {
			this.armazenadoMsg = null;
			this.armazenadoCor = "gray";
			this.lerSelecionado = true;
		},
		apagarPressionado(event) {
			this.armazenadoMsg = null;
			this.armazenadoCor = "gray";
			this.apagarSelecionado = true;
		},
		enviarPressionado(event) {
			this.armazenadoMsg = null;
			this.armazenadoCor = "gray";
			this.arquivoSelecionado = null;
			this.enviarSelecionado = true;
		},
		voltarPressionado(event) {
			if(this.arquivoCarregado) {
				this.arquivoCarregado = null;
			} else {
				this.mensagem = null;
				this.lerSelecionado = false;
				this.apagarSelecionado = false;
				this.enviarSelecionado = false;
			}
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
			this.armazenadoMsg = "Enviando para o banco de dados...";
			this.armazenadoCor = "blue"; 
			this.enviarBDSelecionado = true; 

			if (this.arquivoSelecionado) {
				console.log("Condição Verificada");
				try {
					this.enviarDadosParaBD(this.arquivoSelecionado);
					this.armazenadoMsg = "Dados enviados com sucesso!";
					this.armazenadoCor = "green"; 
				} catch (error) {
					this.armazenadoMsg = "Erro ao enviar dados.";
					this.armazenadoCor = "red"; 
				}
			} else {
				this.armazenadoMsg = "Nenhum dado para enviar.";
				this.armazenadoCor = "orange";
			}
		},

		// Armazena arquivo selecionado e salva no cache
		uploadArquivo(event) {
			const file = event.target.files[0];
     		if (!file) {
				this.armazenadoMsg = "Operação cancelada.";
				this.armazenadoCor = "gray";
				return;
			}

			const fileName = file.name;
			const fileExtension = fileName.split(".").pop();
			if(!this.formatos.includes("." + fileExtension.toLowerCase())) {
				this.armazenadoMsg = "Este formato de arquivo não é permitido! Use apenas: " + this.formatos.join(", ");
				this.armazenadoCor = "red";
				return;
			}

			this.armazenadoMsg = "Carregando...";
			this.armazenadoCor = "gray";
			let acao = this.arquivosArmazenados.has(fileName) ? "sobreescrito" : "carregado";

			const reader = new FileReader();
			if(fileExtension.toLowerCase() == "xlsx") {
				// Salva XLSX como Base64 para evitar corrupção de dados
				reader.onload = () => {
					const readerResult = new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), "");
					this.arquivosArmazenados.set(fileName, btoa(readerResult));
					this.armazenadoMsg = `Arquivo "${fileName}" ${acao} com sucesso!`;
					this.armazenadoCor = "green";
					this.salvar();
				}
				reader.readAsArrayBuffer(file);
			} else {
				reader.onload = () => {
					this.arquivosArmazenados.set(fileName, reader.result);
					this.armazenadoMsg = `Arquivo "${fileName}" ${acao} com sucesso!`;
					this.armazenadoCor = "green";
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

			// Suporte a XML
			function recursivaXml(subdata) {
				if(subdata instanceof Element) {
					for (child of subdata.children) {
						recursivaXml(subdata.children);
					}
				} else if(subdata instanceof HTMLCollection) {
					for (const element of subdata) {
						let atributos = [];
						let elementName = element.tagName;
						for (const attr of element.attributes) {
							atributos.push(`${attr.name}: ${attr.value}`);
						}
						if(atributos.length > 0) elementName += ` (${atributos.join(", ")})`;
						
						data += "<li>" + elementName;
						if(element.children.length > 0) {
							data += "<ul>";
							recursivaXml(element.children);
							data += "</ul>";
						} else {
							data += `: ${element.textContent}`;
						}
						data += "</li>";
					}
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
					case "xml": {
						data += "<ul>";
						let xml = new DOMParser().parseFromString(content, "text/xml");
						recursivaXml(xml.documentElement.children);
						data += "</ul>";
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
    // Verifica se o arquivo foi selecionado
    if (!this.arquivoSelecionado) {
        this.mensagem = "Nenhum arquivo selecionado.";
        return;
    }

    const formData = new FormData();
    formData.append("file", this.arquivoSelecionado); // Use a variável 'arquivoSelecionado' aqui

    try {
        const response = await axios.post("http://localhost:8080/api/files/upload", formData, {
            
			headers: {
                "Content-Type": "multipart/form-data",
            }
			
        });

        // Verificar a resposta
        console.log(response); // Para debug
        this.mensagem = `Upload realizado com sucesso: ${response.data}`; // Ajuste conforme a resposta esperada

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

</script>

<template>
	<!-- Tela inicial -->
	<div v-if="!lerSelecionado && !apagarSelecionado && !enviarSelecionado">
		<h1>Escolha uma ação:</h1>
		<hr>
		<input type="file" ref="file" :accept="formatos.join(',')" style="display: none" @change="uploadArquivo"/>
		<button @click="$refs.file.click()">Armazenar Arquivo</button>
		<br>
		<button @click="enviarPressionado">Enviar ao Banco de Dados</button>
		<br>
		<button @click="apagarPressionado">Apagar Arquivo</button>
		<br><br>
		<button @click="lerPressionado">Ler Arquivo</button>
		<br>
		<p v-if="armazenadoMsg != null" :style="{ color: armazenadoCor } ">{{ armazenadoMsg }}</p>
	</div>

	<!-- Tela de seleção de arquivo -->
	<div v-else-if="(lerSelecionado || apagarSelecionado) && arquivoCarregado == null">
		<h3>Arquivos salvos: {{ arquivosArmazenados.size }} </h3>
		<hr>
		<h3 v-if="lerSelecionado">Qual arquivo deseja abrir?</h3>
		<h3 v-else="apagarSelecionado">Qual arquivo quer apagar?</h3>
		<div v-for="[key, value] in arquivosArmazenados" :key="key">
			<button @click="arquivoCarregado = key">{{ key }}</button>
			<br>
		</div>
		<br>
		<button v-if="lerSelecionado" @click="arquivoCarregado = '*'" id="botaoListaTodos">Mostrar Todos</button>
		<button @click="voltarPressionado">Voltar</button>
	</div>

	<!-- Tela de confirmação para apagar arquivo -->
	<div v-else-if="apagarSelecionado">
		<h3>Deseja apagar: "{{ arquivoCarregado }}"?</h3>
		<hr>
		<button @click="apagarArquivo">Sim</button>
		<br>
		<button @click="voltarPressionado">Não</button>
	</div>

	<!--Tela de envio de arquivo, Modificar se necessário-->
	<div v-else-if="enviarSelecionado">
		<h3>Enviar Arquivo ao Banco de Dados</h3>
		<hr>
		<!-- Input para seleção de arquivo -->
		<label for="fileInput">Escolha um arquivo para enviar:</label>
		<br>
		<input id="fileInput" type="file" @change="arquivoEnviado"/>
		<br><br>
		
		<!-- Botão para enviar o arquivo -->
		<button @click="enviarBDPressionado">
			Enviar Arquivo
		</button>
		
		<!-- Botão para cancelar -->
		<button @click="voltarPressionado">
			Cancelar
		</button>
		
		<!-- Feedback do status -->
		<div v-if="mensagem != null">
			<p :style="{ color: mensagemCor }">{{ mensagem }}</p>
		</div>
	</div>
	
	<!-- Tela de visualização de arquivo -->
	<div v-else>
		<h3 v-if="arquivoCarregado != '*'">Visualizando: {{ arquivoCarregado }}</h3>
		<h3 v-else>Visualizando: Todos</h3>
		<hr>
		<ol v-html="visualizarArquivo()"></ol>
		<hr>
		<button @click="voltarPressionado">Voltar</button>
	</div>

</template>
