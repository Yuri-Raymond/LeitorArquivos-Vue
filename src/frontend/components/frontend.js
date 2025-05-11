
import axios from 'axios';
import * as XLSX from "xlsx"; // Usado para o suporte a arquivos do Excel
import "./sheets/styles.css";  // Importação do CSS externo

export default {
	data() {
		return {
			formatos: [".csv", ".xlsx", ".json"],
			arquivoCarregado: null,
			arquivoSelecionado: null,
			tela: "inicio",
			_historicoTelas: [], //Usado para o botão de voltar

			// Informações de processos já carregados para o Controle de Importações
			processos: [],
			/*[
				{
					id: "arquivo-3.csv",
					periodo: "2025/1",
					inicio: "8/24/2025 - 16:59",
					termino: "15/6/2025 - 22:30",
					status: "Em andamento"
				},
				{
					id: "arquivo-2.csv",
					periodo: "2025/1",
					inicio: "17/8/2024 - 19:09",
					termino: "7/12/2024 - 22:30",
					status: "Concluído"
				},
				{
					id: "arquivo-1.csv",
					periodo: "2024/2",
					inicio: "9/2/2024 - 16:59",
					termino: "11/6/2024 - 22:30",
					status: "Concluído"
				}
			],*/

			// Para a importação de dados:
			telaEtapas: ["importarPeriodo", "importarDisciplinas", "importarTurmas", "importarUsuarios", "importarVinculos"],
			nomeEtapas: ["Período Letivo", "Disciplinas", "Turmas", "Usuários", "Vínculos"],
			etapaAtual: 0,
			listaAtual: null,
			
			paginaAtual: 0, //Para a paginação

			// Etapa 1 - Ano Letivo
			processoAtualNome: "",

			anoLetivoInicio: new Date().getFullYear(),
			periodoInicio: 1,

			anoLetivoTermino: new Date().getFullYear(),
			periodoTermino: 2,

			// Etapa 2 - Disciplinas
			arquivoDisciplinas: null,
			listaDisciplinas: [],

			// Etapa 3 - Turmas
			arquivoTurmas: null,
			listaTurmas: [],

			// Etapa 4 - Usuarios
			arquivoUsuarios: null,
			listaUsuarios: [],

			// Etapa 5 - Vínculos
			arquivoVinculos: null,
			listaVinculos: []
		}
	},
	mounted() {
		this.atualizarProcessos();
	},
	watch: {
		tela() {
			this.atualizarPaginacao();
		}
	},
	methods: {
		// Telas
		mudarTela(tela, historico = true) {
			if(historico) {
				this._historicoTelas.push(this.tela);
			}
			this.tela = tela;
			this.paginaAtual = 0;
			this.etapaAtual = this.telaEtapas.indexOf(tela);

			let tituloDaPagina = "Página sem nome";
			switch(this.tela) {
				case "inicio":
					tituloDaPagina = "Página Inicial";
					break;
				case "controleDados":
					tituloDaPagina = "Controle de Importações";
					this.atualizarProcessos();
					break;
				case "importarPeriodo":
				case "importarDisciplinas":
				case "importarTurmas":
				case "importarUsuarios":
				case "importarVinculos":
					tituloDaPagina = "Novo Processo";
					break;
			}
			document.title = "Sistema Bonsae - " + tituloDaPagina;
		},
		voltarTela() {
			// Botão voltar não deve adicionar a tela ao histórico para evitar loop de telas
			this.mudarTela(this._historicoTelas.pop(), false);
		},

		proximaEtapa() {
			this.mudarTela(this.telaEtapas[this.etapaAtual+1]);
		},
		async finalizarProcesso() {
			if(await this.enviarBDPressionado()) {
				this.mudarTela("controleDados");
			}
		},

		nomeDaTela() {
			switch(this.tela) {
				case "controleDados":
					return "Controle de Importação";
				case "importarPeriodo":
				case "importarDisciplinas":
				case "importarTurmas":
				case "importarUsuarios":
				case "importarVinculos":
					return "Importação de Dados";
				default:
					return "Tela sem nome";
			}
		},

		descricaoDaTela() {
			switch(this.tela) {
				case "controleDados":
					return "Gerenciar arquivos enviados.";
				case "importarPeriodo":
				case "importarDisciplinas":
				case "importarTurmas":
				case "importarUsuarios":
				case "importarVinculos":
					return "Enviar arquivos ao banco de dados.";
				default:
					return "Tela sem descrição.";
			}
		},

		// Paginação
		mudarPagina(num) {
			this.paginaAtual = num;
		},
		limiteDePagina(lista) {
			let min = Math.floor(this.paginaAtual * 5);
			return lista.slice(min, min + 5);
		},

		//Modificar
		async enviarBDPressionado() {
			console.log("Enviando para o banco de dados...");
			if (this.arquivoSelecionado) {
				try {
					await this.enviarDadosParaBD(this.listaDisciplinas, 'Discipline/PutBulk', true);
					await this.enviarDadosParaBD(this.listaTurmas, 'Class/PutBulk', true);
					await this.enviarDadosParaBD(this.listaUsuarios, 'User/PutBulk', true);
					await this.enviarDadosParaBD(this.listaVinculos, 'Bond/PutBulk', true);
					console.log(`Upload de dados realizado com sucesso, criando processo!`);
					
					const disciplinas = this.listaDisciplinas.map(disciplina => disciplina.codigo).join(';');
					const turmas = this.listaTurmas.map(turma => turma.codigo).join(';');
					const usuarios = this.listaUsuarios.map(usuario => usuario.matricula).join(';');
					const vinculos = this.listaVinculos.map(vinculo => vinculo.matricula).join(';');

					const processo = await this.enviarDadosParaBD({
						id: this.processoAtualNome,
						periodoInicio: `${this.anoLetivoInicio}/${this.periodoInicio}`,
						periodoTermino: `${this.anoLetivoTermino}/${this.periodoTermino}`,
						inicio: new Date(),
						termino: new Date(0),
						DisciplineId: disciplinas,
						ClassId: turmas,
						UserId: usuarios,
						BondId: vinculos
					}, 'Process/Post', false);
					console.log("Processo enviado! Voltando a tela de Controle de Importações...");
					return true;
				} catch (error) {
					console.error("Erro ao enviar dados: " + error);
				}
			} else {
				console.log("Nenhum dado para enviar.");
			}
			return false;
		},

		// Armazena arquivo selecionado e salva no cache
		async uploadArquivo(event) {
			const input = event.target;
			const file = input.files[0];
		
			if (!file) {
				console.log("Nenhum arquivo selecionado.");
				return;
			}
		
			const fileName = file.name;
			const fileExtension = fileName.split(".").pop().toLowerCase();
		
			if (!this.formatos.includes("." + fileExtension)) {
				console.log(`Formato inválido! Permitidos: ${this.formatos.join(", ")}`);
				return;
			}

			//Converte .XLSX/.CSV para JSON
			function formatacao(str) {
				return str ? str.normalize("NFD").replace(/[\u0300-\u036f-_\s]/g, "").trim().toLowerCase() : null;
			}
			
			function converter(renomear, planilha) {
				renomear = new Map(Object.entries(renomear).map(([chave, valor]) => [formatacao(chave), valor]));

				return planilha.map(obj => Object.fromEntries(Object.entries(obj).map(function([chave, valor]) {
					//console.log(chave, valor);
					chave = formatacao(chave);
					return [renomear.get(chave) || chave, valor];
				})));
			}

			switch(fileExtension) {
				case "xlsx":
					const arrayBuffer = await file.arrayBuffer();
					const workbook = XLSX.read(arrayBuffer, { type: "array", cellText: true, cellDates: true });
					for (const planilhaNome of workbook.SheetNames) {
						const planilha = XLSX.utils.sheet_to_json(workbook.Sheets[planilhaNome]);
						switch(formatacao(planilhaNome).toLowerCase()) {
							case "disciplinas":
							case "disciplina":
								this.arquivoDisciplinas = file;
								this.listaDisciplinas = converter({"Periodo Letivo": "periodo", "Data de Inicio": "inicio", "Data de Termino": "termino", "Periodo Curricular": "periodoCurricular"}, planilha);

								break;
							case "turmas":
							case "turma":
								this.arquivoTurmas = file;
								this.listaTurmas = converter({"Nome da Turma": "turma", "Disciplina Associada": "disciplina", "Inicio das Aulas": "inicio", "Termino das Aulas": "termino", "Professor Responsavel": "professor"}, planilha);
								break;
							case "usuarios":
							case "usuario":
								this.arquivoUsuarios = file;
								this.listaUsuarios = converter({"Nome Completo": "nome", "Data de Nascimento": "nascimento", "Data de Cadastro": "cadastro", "Periodo Curricular": "periodoCurricular"}, planilha);
								break;
							case "vinculos":
							case "vinculo":
								this.arquivoVinculos = file;
								this.listaVinculos = converter({"Nome de Usuario": "nome", "Data de Inicio": "inicio", "Data de Termino": "termino", "Observacoes": "obs"}, planilha);
								break;
							default:
								console.error(`Planilha desconhecida no arquivo: "${planilhaNome}"`);
						}
					}
					break;
				case "csv":
					break;
			}
			this.paginaAtual = 0;
			this.atualizarPaginacao();
		},

		async atualizarProcessos() {
			const url = `http://localhost:8080/Process/Get`;
			axios.get(url)
			.then(response => {
				console.log("Processos recebidos:", response.data?.length ?? 0);
				if (response.data && response.data.length > 0) {
					this.processos = response.data;
					for (let processo of this.processos) {
						processo.status = (processo.inicio >= processo.termino) ? "Em andamento" : "Concluído";
					}
				}
				else this.processos = [];
			})
			.catch(error => {
				this.processos = [];
				console.error("Erro ao atualizar processos:", error?.message ?? error);
			});
		},

		atualizarPaginacao() {
			switch(this.tela) {
				case "importarDisciplinas":
					this.listaAtual = this.listaDisciplinas;
					this.arquivoSelecionado = this.arquivoDisciplinas;
					break;
				case "importarTurmas":
					this.listaAtual = this.listaTurmas;
					this.arquivoSelecionado = this.arquivoTurmas;
					break;
				case "importarUsuarios":
					this.listaAtual = this.listaUsuarios;
					this.arquivoSelecionado = this.arquivoUsuarios;
					break;
				case "importarVinculos":
					this.listaAtual = this.listaVinculos;
					this.arquivoSelecionado = this.arquivoVinculos;
					break;
				default:
					this.listaAtual = null;
					this.arquivoSelecionado = null;
			}
		},

		formatarData(data) {
			const d = new Date(data);
			const dia = String(d.getDate()).padStart(2, '0');
			const mes = String(d.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
			const ano = d.getFullYear();
			return `${dia}/${mes}/${ano}`;
		},
		formatarDataHora(dataHora) {
			const d = new Date(dataHora);
			const dia = String(d.getDate()).padStart(2, '0');
			const mes = String(d.getMonth() + 1).padStart(2, '0'); // Janeiro = 0
			const ano = d.getFullYear();

			const horas = String(d.getHours()).padStart(2, '0');
			const minutos = String(d.getMinutes()).padStart(2, '0');

			return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
		},

		truncarNome(nome) {
			const limite = 30;
			if (nome.length <= limite) return nome;
		
			const partes = nome.split(".");
			const extensao = partes.length > 1 ? "." + partes.pop() : "";
			const base = partes.join(".");
			const truncado = base.slice(0, limite - extensao.length - 5); // "....ext"
			return `${truncado}....${extensao}`;
		},
		
	
		// Função para validar e enviar arquivo para a API
		async enviarDadosParaBD(files, schemaKey, doPut) {
			if (!schemaKey) {
				console.log("Nenhuma schemaKey fornecida.");
				return null;
			}

			try {
				console.log(JSON.stringify(files));
				// Substitui ':schemaKey' na URL pelo valor real do schemaKey
				const url = `http://localhost:8080/${schemaKey}`;
				const headers = {headers: {'Content-Type': 'application/json'}};
				const response = await (doPut ? axios.put(url, files, headers) : axios.post(url, files, headers));

				// Verificar a resposta
				//console.log(response);
				//console.log(`Upload realizado com sucesso!`);
				return response;
			} catch (error) {
				console.log(error.response ? `Erro no upload: ${error.response.data.message || "Erro desconhecido"}` : "Erro na conexão com o servidor.");
			}
			return null;
		}
	}
}