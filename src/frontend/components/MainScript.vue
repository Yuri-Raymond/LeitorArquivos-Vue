<script src="./frontend.js"></script>

<template>
	<!-- Tela inicial -->
	<div v-if="tela == 'inicio'">
		<div class="destaqueTopo" style="height: 90px;">
			<h1>Escolha uma ação:</h1>
			<hr>
		</div>
		<div class="centralizado moverParaBaixo">
			<input type="file" ref="file" :accept="formatos.join(',')" style="display: none" @change="uploadArquivo"/>
			<button @click="$refs.file.click()">Armazenar Arquivo</button>
			<button @click="mudarTela('enviar')">Enviar ao Banco de Dados</button>
			<button @click="mudarTela('apagar')" class="botaoVermelho">Apagar Arquivo</button>
			<br>
			<button @click="mudarTela('ler')">Ler Arquivo</button>
			<p v-if="mensagem != null" :style="{ color: mensagemCor } ">{{ mensagem }}</p>
			<p v-else style="opacity: 0;">Nada.</p>
		</div>
	</div>

	<!-- Tela de seleção de arquivo -->
	<div v-else-if="(tela == 'ler' || tela == 'apagar') && !arquivoCarregado">
		<div class="destaqueTopo">
			<h3>Arquivos salvos: {{ arquivosArmazenados.size }} </h3>
			<hr>
		</div>

		<div class="centralizado">
			<h3 v-if="tela == 'ler'">Qual arquivo deseja abrir?</h3>
			<h3 v-else="tela == 'apagar'">Qual arquivo quer apagar?</h3>
			<div v-for="[key, value] in arquivosArmazenados" :key="key">
				<button @click="arquivoCarregado = key">{{ key }}</button>
				<br>
			</div>
			<br>
			<div style="flex-direction: row;">
				<button v-if="tela == 'ler'" @click="arquivoCarregado = '*'" id="botaoListaTodos">Mostrar Todos</button>
				<button @click="mudarTela('inicio')">Voltar</button>
			</div>
		</div>
	</div>

	<!-- Tela de confirmação para apagar arquivo -->
	<div v-else-if="tela == 'apagar' && arquivoCarregado" class="confirmarApagar">
		<h3>Deseja apagar: "{{ arquivoCarregado }}"?</h3>
		<div style="flex-direction: row;">
			<button @click="apagarArquivo" class="botaoVermelho">Sim</button>
			<button @click="voltarPressionado">Não</button>
		</div>
	</div>

	<!--Tela de envio de arquivo, Modificar se necessário-->
	<div v-else-if="tela == 'enviar'">
		<div class="destaqueTopo">
			<h3>Enviar Arquivo ao Banco de Dados</h3>
			<hr>
		</div>
		
		<div class="centralizado moverParaBaixo">
			<label for="fileInput">Escolha um arquivo para enviar:</label>
			<br>
			<input id="fileInput" type="file" :accept="formatos.join(',')" @change="arquivoEnviado"/>
			<br>
			
			<div style="flex-direction: row;">
				<button @click="enviarBDPressionado" class="botaoVerde" :disabled="!arquivoSelecionado">Enviar Arquivo</button>
				<button @click="mudarTela('inicio')">Cancelar</button>
			</div>
			
			<p v-if="mensagem != null" :style="{ color: mensagemCor }">{{ mensagem }}</p>
			<p v-else style="opacity: 0;">Nada.</p>
		</div>
	</div>
	
	<!-- Tela de visualização de arquivo -->
	<div v-else-if="tela == 'ler'">
		<div class="destaqueTopo">
			<h3 v-if="arquivoCarregado != '*'">Visualizando: {{ arquivoCarregado }}</h3>
			<h3 v-else>Visualizando: Todos</h3>
			<hr>
		</div>
		<ol v-html="visualizarArquivo()" class="margensPagina" style="margin-left: 40px; margin-right: 40px;"></ol>
		<div class="destaqueFundo">
			<hr>
			<button @click="voltarPressionado">Voltar</button>
		</div>
	</div>

</template>
