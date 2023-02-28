const bd_pendentes = pegarLocalStorage("bd_pendentes");
const bd_concluidas = pegarLocalStorage("bd_concluidas");

const containerTarefa = document.getElementById("conteudoTarefa");

const btnSalvar = document.getElementById("salvar");
btnSalvar.addEventListener("click", criarTarefa);
btnSalvar.addEventListener("click", salvaFechaModal);

const tab1 = document.getElementById("tab1");
tab1.addEventListener("click", identificaTabs);

const tab2 = document.getElementById("tab2");
tab2.addEventListener("click", identificaTabs);


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
    valoresInputModal();
    novaTarefa(addTituloTarefa, addConteudoTarefa, addDataTarefa);
    organizarPorData(bd_pendentes);
    salvarLocalStorage("bd_pendentes", bd_pendentes);
}

function valoresInputModal() {
    addTituloTarefa = document.getElementById("txtTitulo").value;

    addDataTarefa = document.getElementById("dataTarefa").value;

    addConteudoTarefa = document.getElementById("txtTarefa").value;
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

function salvaFechaModal() {
    if (bd_pendentes.length == 1) {
        window.location.reload();
    }

    else {
        if (tab2.checked) {
            esvaziaConteudo();
            listarTarefas("listarConcluidas");
        }

        else {
            esvaziaConteudo();
            listarTarefas("listarPendentes");
        }
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
        <h4 class="mb-4" id="tituloCard">${lista.titulo}</h4>
        <p>${lista.conteudo}</p>
        <div class="opcoesCard" >
            <div class="form-check d-inline-block cursor">
                <input class="form-check-input cursor" id="concluida${numtarefa}" type="checkbox" data-numtarefa="${numtarefa}">
                <label for="concluida${numtarefa}" class="form-check-label cursor">Concluída</label>
            </div>
            <p class="d-inline-block cursor" id="excluir" data-numtarefa="${numtarefa}"><i class="bi-trash" id="iconExcluir"></i> Excluir</p>
            <p id="data">${dataFormatada}</p>
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



// JANELA MODAL 

const janelaModal = document.getElementById("janelaModal");

const btnModal = document.getElementById("btnModal");

const btnFechaModal = document.getElementById("cancelar");


// ABRE A JANELA MODAL
btnModal.addEventListener("click", abrirModal);

function abrirModal() {
    janelaModal.classList.add("abreModal");
};

// FECHA A JANELA MODAL
btnFechaModal.addEventListener("click", fecharModal);

janelaModal.addEventListener("click", fecharModal);

function fecharModal(e) {
    if (e.target.id == "cancelar" || e.target.id == "janelaModal" || e.target.id == "salvar") {
        janelaModal.classList.remove("abreModal");
    }
}