<script src="./frontend.js"></script>

<template>
	<!-- Tela inicial -->
	<div v-if="!lerSelecionado && !apagarSelecionado && !enviarSelecionado">
		<div class="destaqueTopo" style="height: 90px;">
			<h1>Escolha uma ação:</h1>
			<hr>
		</div>
		<div class="centralizado moverParaBaixo">
			<input type="file" ref="file" :accept="formatos.join(',')" style="display: none" @change="uploadArquivo"/>
			<button @click="$refs.file.click()">Armazenar Arquivo</button>
			<button @click="enviarPressionado">Enviar ao Banco de Dados</button>
			<button @click="apagarPressionado" class="botaoVermelho">Apagar Arquivo</button>
			<br>
			<button @click="lerPressionado">Ler Arquivo</button>
			<p v-if="armazenadoMsg != null" :style="{ color: armazenadoCor } ">{{ armazenadoMsg }}</p>
			<p v-else style="opacity: 0;">Nada.</p>
		</div>
	</div>

	<!-- Tela de seleção de arquivo -->
	<div v-else-if="(lerSelecionado || apagarSelecionado) && arquivoCarregado == null">
		<div class="destaqueTopo">
			<h3>Arquivos salvos: {{ arquivosArmazenados.size }} </h3>
			<hr>
		</div>

		<div class="centralizado">
			<h3 v-if="lerSelecionado">Qual arquivo deseja abrir?</h3>
			<h3 v-else="apagarSelecionado">Qual arquivo quer apagar?</h3>
			<div v-for="[key, value] in arquivosArmazenados" :key="key">
				<button @click="arquivoCarregado = key">{{ key }}</button>
				<br>
			</div>
			<br>
			<div style="flex-direction: row;">
				<button v-if="lerSelecionado" @click="arquivoCarregado = '*'" id="botaoListaTodos">Mostrar Todos</button>
				<button @click="voltarPressionado">Voltar</button>
			</div>
		</div>
	</div>

	<!-- Tela de confirmação para apagar arquivo -->
	<div v-else-if="apagarSelecionado" class="confirmarApagar">
		<h3>Deseja apagar: "{{ arquivoCarregado }}"?</h3>
		<div style="flex-direction: row;">
			<button @click="apagarArquivo" class="botaoVermelho">Sim</button>
			<button @click="voltarPressionado">Não</button>
		</div>
	</div>

	<!--Tela de envio de arquivo, Modificar se necessário-->
	<div v-else-if="enviarSelecionado">
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
				<button @click="voltarPressionado">Cancelar</button>
			</div>
			
			<p v-if="mensagem != null" :style="{ color: mensagemCor }">{{ mensagem }}</p>
			<p v-else style="opacity: 0;">Nada.</p>
		</div>
	</div>
	
	<!-- Tela de visualização de arquivo -->
	<div v-else>
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
