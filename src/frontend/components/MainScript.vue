<script src="./frontend.js"></script>

<template>
	<!-- Tela inicial -->
	<div v-if="tela == 'inicio'" class="telaInicial">
		<div class="caixaTelaInicial">
			<h1>Sistema Bonsae</h1>
			<div class="bg"></div>
			<br>
			<button @click="mudarTela('controleDados')">Controle de Importações</button>
			<button @click="mudarTela('importarDados')">Importação de Dados</button>
		</div>
	</div>

	<div v-else>
		<!-- Header -->
		<div class="header">
			<img src="./images/back.png" @click="voltarTela()">
			<div style="display: flex; flex-direction: column; align-items: flex-start;">
				<p class="nomeDaTela" v-html="nomeDaTela()"></p>
				<p class="descricaoDaTela" v-html="descricaoDaTela()"></p>
			</div>

			<button v-if="tela == 'controleDados'" @click="mudarTela('importarDados')">+ Novo Processo</button>
			</div>

		<div style="margin-top: 50px;">
			<!-- Controle de Importações -->
			<div v-if="tela == 'controleDados'" style="display: flex; justify-content: center; align-items: center;">
				<table class="tabelaDados">
					<thead>
						<tr>
							<th>ID do Processo</th>
							<th>Período Letivo</th>
							<th>Data de Início</th>
							<th>Data de Término</th>
							<th>Status do Envio</th>
							<th>Ações</th>
						</tr>
					</thead>

					<tbody>
						<tr v-for="(processo, id) in processos" :key="id">
							<td v-html="processo.id"></td>
							<td v-html="processo.periodo"></td>
							<td v-html="processo.inicio"></td>
							<td v-html="processo.fim"></td>
							<td style="padding: 0;">
								<p v-html="processo.status" class="processoStatus" :class="{statusAndamento: processo.status.toLowerCase() == 'em andamento', statusConcluido: processo.status.toLowerCase() == 'concluído'}"></p>
							</td>
						
							<!-- Botões para "Em andamento"-->
								<td v-if="processo.status.toLowerCase() == 'em andamento'" >
									<div class="processoAcoes">
										<button class="botaoAcao botaoCinza">Editar</button>
										<button class="botaoAcao botaoVermelho">Cancelar</button>
									</div>
								</td>
								<!-- Botões para "Concluído"-->
								<td v-else-if="processo.status.toLowerCase() == 'concluído'">
									<div class="processoAcoes">
										<button class="botaoAcao">Visualizar</button>
									</div>
								</td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- Importação de Dados -->
			<div v-else-if="tela == 'importarDados'" class="importacao-container">

				<div class="etapas"> <!-- Os circulos das etapas -->
					<div class="etapa ativa">
						<div class="numero">1</div>
						<div>Período Letivo</div>
					</div>
					<div class="etapa">
						<div class="numero">2</div>
						<div>Disciplinas</div>
					</div>
					<div class="etapa">
						<div class="numero">3</div>
						<div>Turmas</div>
					</div>
					<div class="etapa">
						<div class="numero">4</div>
						<div>Usuários</div>
					</div>
					<div class="etapa">
						<div class="numero">5</div>
						<div>Vínculos</div>
					</div>
					</div>

					<div class="inputs-container">
					<div class="input-grupo">
						<label for="anoLetivo">Ano Letivo</label>
						<input type="number" id="anoLetivo" v-model="anoLetivo" min="2000" max="3000" /> <!-- Limites do Ano seletivo -->
					</div>

					<div class="input-grupo">
						<label for="periodo">Período</label>
						<input type="number" id="periodo" v-model="periodo" min="1" max="99" /> <!-- Limites do Perido -->
					</div>
					</div>

					<button class="botao-avancar" @click="mudarTela('importarDisciplinas')">Avançar</button>
			</div>

			<div v-else-if="tela == 'importarDisciplinas'" class="importacao-container">

				<div class="etapas"> <!-- Os circulos das etapas -->
					<div class="etapa ativa">
						<div class="numero">1</div>
						<div>Período Letivo</div>
					</div>
					<div class="etapa ativa">
						<div class="numero">2</div>
						<div>Disciplinas</div>
					</div>
					<div class="etapa">
						<div class="numero">3</div>
						<div>Turmas</div>
					</div>
					<div class="etapa">
						<div class="numero">4</div>
						<div>Usuários</div>
					</div>
					<div class="etapa">
						<div class="numero">5</div>
						<div>Vínculos</div>
					</div>
				</div>

				<div class="upload-box"> <!-- Caixa De Upload de Arquivo -->
					
					<div class="icone-upload-circulo">
					<img src="./images/upload.png" class="upload-icone">
					</div>
					<div><strong>Arquivo carregado:</strong> {{ nomeArquivo }}</div>
					</div>

					
					<table class="tabela-disciplinas"> <!-- Tabela de Disciplinas -->
					<thead>
						<tr>
						<th>Período Letivo</th>
						<th>Disciplina</th>
						<th>Código</th>
						<th>Data de Início</th>
						<th>Data de Término</th>
						<th>Categoria</th>
						<th>Período Curricular</th>
						<th>Estado</th>
						<th>Campus</th>
						<th>Status</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(disciplina, index) in disciplinas" :key="index">
						<td>{{ disciplina.periodo }}</td>
						<td>{{ disciplina.nome }}</td>
						<td>{{ disciplina.codigo }}</td>
						<td>{{ disciplina.inicio }}</td>
						<td>{{ disciplina.termino }}</td>
						<td>{{ disciplina.categoria }}</td>
						<td>{{ disciplina.curricular }}</td>
						<td>{{ disciplina.estado }}</td>
						<td>{{ disciplina.campus }}</td>
						<td>
							<span class="status" :class="disciplina.status.toLowerCase()">{{ disciplina.status }}</span>
						</td>
						</tr>
					</tbody>
					</table>

					
					<div class="paginacao"> <!-- Paginação -->
					<span class="pagina">&laquo;</span>
					<span v-for="n in totalPaginas" :key="n" class="pagina" :class="{ ativo: n === paginaAtual }">{{ n }}</span>
					<span class="pagina">&raquo;</span>
					</div>

					
					<div class="botao-direita"> <!-- Botão Avançar -->
					<button class="botao-avancar" @click="mudarTela('importarDisciplinas')">Avançar</button>
					</div>
			</div>
		</div>
	</div>
</template>
