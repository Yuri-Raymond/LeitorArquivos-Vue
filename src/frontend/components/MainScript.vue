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
			<div v-else-if="tela == 'importarDados'">
				<p>TELA DE IMPORTAÇÃO DE DADOS</p>
			</div>
		</div>
	</div>
</template>
