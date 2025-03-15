<script>
export default {
	data() {
		return {
			tiposPermitidos: [".csv", ".xlsx", ".json", ".xml"],
			opcoes: ["CSV", "Excel", "JSON", "XML"],
			armazenadoMsg: null,
			armazenadoCor: "gray",
			lerSelecionado: false,
			arquivoCarregado: null,
			arquivosArmazenados: new Map()
		}
	},
	mounted() {
		// carrega como array e converte para map
		const arquivosSalvos = localStorage.getItem("arquivosArmazenados");
		if(arquivosSalvos) {
			JSON.parse(arquivosSalvos).forEach(element => {
				this.arquivosArmazenados.set(element.name, element.content);
				console.log(`Encontrado: "${element.name}", tamanho: ${element.content.length}`);
			});
		}
	},
	methods: {
		uploadArquivo(event) {
			const file = event.target.files[0];
     		if (!file) {
				this.armazenadoMsg = "Operação cancelada.";
				this.armazenadoCor = "gray";
				return;
			}

			const fileName = file.name;
			const fileExtension = fileName.split(".").pop();
			if(!this.tiposPermitidos.includes("." + fileExtension.toLowerCase())) {
				this.armazenadoMsg = "Este formato de arquivo não é permitido! Use apenas: " + this.tiposPermitidos.join(", ");
				this.armazenadoCor = "red";
				return;
			}

			this.armazenadoMsg = "Carregando...";
			this.armazenadoCor = "gray";

			const reader = new FileReader();
			reader.onload = () => {
				let acao = this.arquivosArmazenados.has(fileName) ? "sobreescrito" : "carregado";
				this.arquivosArmazenados.set(fileName, reader.result);
				this.armazenadoMsg = `Arquivo "${fileName}" ${acao} com sucesso!`;
				this.armazenadoCor = "green";

				// converte map para array e salva
				const arquivos = Array.from(this.arquivosArmazenados, ([name, content]) => ({ name, content }));
				localStorage.setItem("arquivosArmazenados", JSON.stringify(arquivos));
			};
			reader.readAsText(file);
		},
		lerPressionado(event) {
			this.armazenadoMsg = null;
			this.armazenadoCor = "gray";
			this.lerSelecionado = true;
		},
		voltarPressionado(event) {
			if(this.arquivoCarregado)
				this.arquivoCarregado = null;
			else
				this.lerSelecionado = false;
		},
		criarLinhas(event) {
			let data = "";
			function recursivaJson(subdata)
			{
				if (Array.isArray(subdata)) {
					data += "<ul>";
					subdata.forEach((element) => {
						data += `<li>${element}</li>`;
					});
					data += "</ul>";
				} else if (typeof subdata === "object" && subdata !== null) {
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
				}
			}

			let primeiro = true;
			function _carregar(content, name) {
				if(!primeiro) data += "<br>";
				data += `<li><strong>${name}</strong>`;
				switch(name.split('.').pop().toLowerCase()) {
					case "json":
						recursivaJson(JSON.parse(content));
						break;
				}
				data += "</li>";
				primeiro = false;
			}

			if(this.arquivoCarregado == "*")
				this.arquivosArmazenados.forEach(_carregar);
			else
				_carregar(this.arquivosArmazenados.get(this.arquivoCarregado), this.arquivoCarregado);
			return data
		}
	}
}
</script>

<template>
	<div v-if="!lerSelecionado">
		<h1>Escolha uma ação:</h1>
		<hr>
		<input type="file" ref="file" :accept="tiposPermitidos.join(',')" style="display: none" @change="uploadArquivo"/>
		<button @click="$refs.file.click()">Armazenar Arquivo</button>
		<br>
		<button @click="lerPressionado">Ler Arquivo</button>
		<br>
		<p v-if="armazenadoMsg != null" :style="{ color: armazenadoCor } ">{{ armazenadoMsg }}</p>
	</div>

	<div v-else-if="lerSelecionado && arquivoCarregado == null">
		<h3>Arquivos salvos: {{ arquivosArmazenados.size }} </h3>
		<hr>
		<h3>Qual arquivo deseja abrir?</h3>
		<div v-for="[key, value] in arquivosArmazenados" :key="key">
			<button @click="arquivoCarregado = key">{{ key }}</button>
			<br>
		</div>
		<br>
		<button @click="arquivoCarregado = '*'" id="botaoListaTodos">Mostrar Todos</button>
		<hr>
		<button @click="voltarPressionado">Voltar</button>
	</div>

	<div v-else>
		<h3 v-if="arquivoCarregado != '*'">Visualizando: {{ arquivoCarregado }}</h3>
		<h3 v-else>Visualizando: Todos</h3>
		<hr>
		<ol v-html="criarLinhas()"></ol>
		<hr>
		<button @click="voltarPressionado">Voltar</button>
	</div>
</template>
