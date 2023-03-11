const bd_pendentes = pegarLocalStorage("bd_pendentes");
const bd_concluidas = pegarLocalStorage("bd_concluidas");

const containerTarefa = document.getElementById("conteudoTarefa");

const alerta = document.getElementById("alerta")
const btnAlerta = document.getElementById("btnAlerta");
btnAlerta.addEventListener("click", function () {
    localStorage.setItem("nExibir", "true")
    alerta.classList.add("dNone")
});

const btnSalvar = document.getElementById("salvar");
btnSalvar.addEventListener("click", valoresInputModal);

const btnEditar = document.getElementById("msgTemporaria");

const inputTituloTarefa = document.getElementById("txtTitulo");
const inputDataTarefa = document.getElementById("dataTarefa");
const txtConteudoTarefa = document.getElementById("txtTarefa");

const tab1 = document.getElementById("tab1");
tab1.addEventListener("click", identificaTabs);

const tab2 = document.getElementById("tab2");
tab2.addEventListener("click", identificaTabs);

const cardTarefa = document.getElementsByClassName("cardTarefa");

const inputData = document.querySelector('input[type="date"]');
const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1;
const ano = dataAtual.getFullYear();
const dataMinima = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
inputData.setAttribute('min', dataMinima);

const tituloModal = document.getElementById("tituloModal")
var autorizaSalvar = false;
var estaEditando = false;
var abriuEditar = false;

// JANELA MODAL 
const janelaModal = document.getElementById("janelaModal");
const btnModal = document.getElementById("btnModal");
const btnFechaModal = document.getElementById("cancelar");

const tarefaCompleta = document.getElementById("tarefaCompleta");
const exibiTitulo = document.getElementById("exibiTitulo");
const exibiConteudo = document.getElementById("exibiConteudo");

// VERIFICAR ALERTA
window.onload = function () {
    var nExibir = localStorage.getItem("nExibir");
    if (nExibir === "true") {
        alerta.classList.add("dNone")
    }
}

// LISTA AS TAREFAS PENDENTES ASSIM QUE A PÁGINA CARREGA
listarTarefas("listarPendentes");

// LOCAL STORAGE
function salvarLocalStorage(chave, bd_array) {
    localStorage.setItem(chave, JSON.stringify(bd_array));
}

function pegarLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave)) ?? [];
}

// APAGA TODO O CONTEÚDO DA PÁGINA ANTES DE LISTAR NOVAMENTE 
function esvaziaConteudo() {
    containerTarefa.innerHTML = "";
}

// CRIAR TAREFAS 
function criarTarefa() {
    if (estaEditando == true) {
        excluirTarefa(numArrayTarefaEdit)
    }
    novaTarefa(contTitulo, contTarefa, contData);
    organizarPorData(bd_pendentes);
    salvarLocalStorage("bd_pendentes", bd_pendentes);
}

function valoresInputModal() {
    let data = new Date();
    let validacao = document.getElementById("validacao");
    let validacaoData = document.getElementById("validacaoData");

    if (inputTituloTarefa.value == '' || inputDataTarefa.value == '' || txtConteudoTarefa.value == '') {
        let validacao = document.getElementById("validacao");
        validacao.classList.remove("dNone");
        validacao.classList.add("dBlock");
        validacaoData.classList.remove("dBlock");
        validacaoData.classList.add("dNone");
    }

    else if (inputDataTarefa.value < dataMinima) {
        validacaoData.classList.remove("dNone");
        validacaoData.classList.add("dBlock");
        validacao.classList.remove("dBlock");
        validacao.classList.add("dNone");
    }

    else {
        validacao.classList.remove("dBlock");
        validacao.classList.add("dNone");
        validacaoData.classList.remove("dBlock");
        validacaoData.classList.add("dNone");
        contTitulo = inputTituloTarefa.value;
        contData = inputDataTarefa.value;
        contTarefa = txtConteudoTarefa.value;
        criarTarefa();
        autorizaSalvar = true;
        salvarFechaModal();
    }
}

function novaTarefa(titulo, conteudo, data) {
    bd_pendentes.push({ titulo, conteudo, data });
}

function organizarPorData(bd) {
    bd.sort(function (a, b) {
        if (a.data < b.data) {
            return -1;
        }
        else {
            return true;
        }
    })
}

function salvarFechaModal() {
    if (tab2.checked) {
        esvaziaConteudo();
        listarTarefas("listarConcluidas");
    }

    else {
        esvaziaConteudo();
        listarTarefas("listarPendentes");
    }
}

// IDENTIFICA QUAL TAB ESTA SELECIONADA 
function identificaTabs(e) {
    esvaziaConteudo();

    if (e.target.id == "tab2") {
        listarTarefas("listarConcluidas");
    }

    else {
        listarTarefas("listarPendentes");
    }
}


// LISTAR TAREFAS
function listarTarefas(e) {
    if (e == "listarConcluidas") {
        let dadosConcluidas = pegarLocalStorage("bd_concluidas");
        numtarefa = 0;
        for (i in dadosConcluidas) {
            lista = dadosConcluidas[i];
            let data = new Date(lista.data);
            dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            criarDivTarefas();
            numtarefa++;
        }

        for (i = 0; i < cardTarefa.length; i++) {
            cardTarefa[i].classList.add("cardConc");
            dataTarefa = document.querySelectorAll("#data");
            dataTarefa[i].classList.add("dataConc")

        }
    }

    else {
        let dadosPendentes = pegarLocalStorage("bd_pendentes");
        numtarefa = 0;
        for (i in dadosPendentes) {
            lista = dadosPendentes[i];
            let data = new Date(lista.data);
            dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            criarDivTarefas();
            numtarefa++;
        }

        for (i = 0; i < cardTarefa.length; i++) {
            cardTarefa[i].classList.add("cardPend")
            dataTarefa = document.querySelectorAll("#data");
            dataTarefa[i].classList.add("dataPend")
        }
    }
    marcarCheck()
}

function marcarCheck() {
    if (tab2.checked) {
        for (i = 0; i <= bd_concluidas.length; i++) {
            let marcarCheck = document.getElementById(`concluida${i}`);
            try {
                marcarCheck.checked = true;
            }
            catch (err) {

            }
        }
    }
}

function criarDivTarefas() {
    containerTarefa.innerHTML +=
        `<div class="cardTarefa">
        <div id="editar" data-numtarefa="${numtarefa}"title="Editar tarefa" ><i class="bi-pencil-square" id="iconEditar" data-numtarefa="${numtarefa}"></i></div>
        <div id="verMais" data-numtarefa="${numtarefa}" title="Visualizar tarefa completa"><i class="bi-box-arrow-up-left" id="iconVerMais" data-numtarefa="${numtarefa}"></i></div>
        <h4 class="mb-4 px-4" id="tituloCard">${lista.titulo}</h4>
        <p>${lista.conteudo}</p>
        <div class="opcoesCard">
            <div class="form-check d-inline-block cursor">
                <input class="form-check-input cursor" id="concluida${numtarefa}" type="checkbox" data-numtarefa="${numtarefa}">
                <label for="concluida${numtarefa}" class="form-check-label cursor">Concluída</label>
            </div>
            <p class="d-inline-block cursor" id="excluir" data-numtarefa="${numtarefa}"><i class="bi-trash" id="iconExcluir"></i> Excluir</p>
            <p id="data" data-numtarefa="${numtarefa}">${dataFormatada}</p>
        </div>
    </div>`;
}

// IDENTIFICAÇÃO DAS TAREFAS E AÇÕES 
try {
    const identTarefa = document.getElementById("conteudoTarefa");
    identTarefa.addEventListener("click", identificaTarefa);
}
catch (err) {

}

function identificaTarefa(e) {
    let tarefaAlvo = e.target;

    if (e.target.tagName == "INPUT") {
        if (e.target.checked) {
            numArrayTarefa = tarefaAlvo.dataset.numtarefa;
            concluirTarefa(numArrayTarefa);
        }
        else {
            numArrayTarefa = tarefaAlvo.dataset.numtarefa;
            tornarPendente(numArrayTarefa);
        }
    }
    else if (e.target.id == "excluir" || e.target.id == "iconExcluir") {
        numArrayTarefa = tarefaAlvo.dataset.numtarefa;
        excluirTarefa(numArrayTarefa);
    }

    else if (e.target.id == "editar" || e.target.id == "iconEditar") {
        numArrayTarefaEdit = tarefaAlvo.dataset.numtarefa;
        editarTarefa(numArrayTarefaEdit);
    }

    else if (e.target.id == "verMais" || e.target.id == "iconVerMais") {
        numArrayTarefa = tarefaAlvo.dataset.numtarefa;
        verMais(numArrayTarefa);
    }
}

function concluirTarefa(indexTarefa) {
    let arrayTarefaConcluida = bd_pendentes.splice(indexTarefa, 1);
    let objConcluido = arrayTarefaConcluida[0];
    let titulo = objConcluido.titulo;
    let conteudo = objConcluido.conteudo;
    let data = objConcluido.data;
    bd_concluidas.push({ titulo, conteudo, data });
    organizarPorData(bd_concluidas)
    salvarLocalStorage("bd_concluidas", bd_concluidas);
    salvarLocalStorage("bd_pendentes", bd_pendentes)
    esvaziaConteudo();
    listarTarefas("listarPendentes")
}

function tornarPendente(indexTarefa) {
    let arrayTarefaPendente = bd_concluidas.splice(indexTarefa, 1);
    let objPendente = arrayTarefaPendente[0];
    let titulo = objPendente.titulo;
    let conteudo = objPendente.conteudo;
    let data = objPendente.data;
    bd_pendentes.push({ titulo, conteudo, data });
    organizarPorData(bd_pendentes)
    salvarLocalStorage("bd_pendentes", bd_pendentes)
    salvarLocalStorage("bd_concluidas", bd_concluidas);
    esvaziaConteudo();
    listarTarefas("listarConcluidas")
}

function excluirTarefa(indexTarefa) {

    if (tab1.checked) {
        bd_pendentes.splice(indexTarefa, 1);
        salvarLocalStorage("bd_pendentes", bd_pendentes);
        esvaziaConteudo();
        listarTarefas("listarPendentes");
    }

    else if (tab2) {
        bd_concluidas.splice(indexTarefa, 1);
        salvarLocalStorage("bd_concluidas", bd_concluidas);
        esvaziaConteudo();
        listarTarefas("listarConcluidas");
    }
}

function editarTarefa(indexTarefa) {
    if (tab1.checked) {
        funcaoEmExecucao = true;
        dadosPendentes = pegarLocalStorage("bd_pendentes");
        let tarefa = dadosPendentes[indexTarefa];
        inputTituloTarefa.value = tarefa.titulo;
        txtConteudoTarefa.value = tarefa.conteudo;
        inputData.value = tarefa.data;
        abrirModal("editando");
        estaEditando = true;
        abriuEditar = true;
    } else {
        btnEditar.style.opacity = 0;
        btnEditar.classList.remove("dNone")
        let opacidade = 0;
        const intervalo = setInterval(function () {
            if (opacidade >= 1) clearInterval(intervalo);
            btnEditar.style.opacity = opacidade;
            opacidade += 0.1;
        }, 30);


        setTimeout(function () {
            btnEditar.classList.add("dNone");
        }, 4000);
    }
}

function verMais(indexTarefa) {
    tarefaCompleta.classList.add("abreModal")
    if (tab1.checked) {
        dadosPendentes = pegarLocalStorage("bd_pendentes");
        let tarefa = dadosPendentes[indexTarefa];
        exibiTitulo.innerText = tarefa.titulo;
        exibiConteudo.innerText = tarefa.conteudo;

    } else {
        dadosConcluidas = pegarLocalStorage("bd_concluidas");
        let tarefa = dadosConcluidas[indexTarefa];
        exibiTitulo.innerText = tarefa.titulo;
        exibiConteudo.innerText = tarefa.conteudo;
    }
}

// ABRE A JANELA MODAL
btnModal.addEventListener("click", abrirModal);

function abrirModal(e) {
    if (e == "editando") {
        tituloModal.innerText = "EDITANDO UMA TAREFA..."
    } else {
        tituloModal.innerText = "ADICIONANDO UMA NOVA TAREFA..."
        if (abriuEditar == true) {
            inputTituloTarefa.value = '';
            inputDataTarefa.value = '';
            txtConteudoTarefa.value = '';
            abriuEditar == false;
        }
    }
    janelaModal.classList.add("abreModal");
};

// FECHA A JANELA MODAL
btnFechaModal.addEventListener("click", fecharModal);

janelaModal.addEventListener("click", fecharModal);

tarefaCompleta.addEventListener("click", fecharModal);

function fecharModal(e) {
    if (e.target.id == "cancelar" || autorizaSalvar == true) {
        janelaModal.classList.remove("abreModal");
        inputTituloTarefa.value = '';
        inputDataTarefa.value = '';
        txtConteudoTarefa.value = '';
        autorizaSalvar = false;
        estaEditando = false;
        let validacao = document.getElementById("validacao");
        validacao.classList.remove("dBlock");
        validacao.classList.add("dNone");
        validacaoData.classList.remove("dBlock");
        validacaoData.classList.add("dNone");
    }

    else if (e.target.id == "janelaModal" || e.target.id == "tarefaCompleta" || e.target.id == "fechar") {
        janelaModal.classList.remove("abreModal");
        tarefaCompleta.classList.remove("abreModal")
        estaEditando = false;
    }
}