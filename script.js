const bd_pendentes = pegarLocalStorage("bd_pendentes");


listarTarefas("listarPendentes");

const btnSalvar = document.getElementById("salvar");
btnSalvar.addEventListener("click", criarTarefa);
btnSalvar.addEventListener("click", salvaFechaModal)

function salvaFechaModal() {
    if (bd_pendentes.length == 1) {
        window.location.reload()
    }

    else {
        if (tab2.checked) {

        }

        else {
            containerTarefa.innerHTML = "";
            listarTarefas("listarPendentes")
        }
    }
}

function criarTarefa() {
    valoresInputModal();
    novaTarefa(addTituloTarefa, addConteudoTarefa, addDataTarefa);
    organizarPorData()

    salvarLocalStorage("bd_pendentes", bd_pendentes);
}

function valoresInputModal() {
    addTituloTarefa = document.getElementById("txtTitulo").value;

    addDataTarefa = document.getElementById("dataTarefa").value;
    // data = new Date(addDataTarefa);
    // dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    addConteudoTarefa = document.getElementById("txtTarefa").value;
}

function novaTarefa(titulo, conteudo, data) {
    bd_pendentes.push({ titulo, conteudo, data })
}

function organizarPorData() {
    bd_pendentes.sort(function (a, b) {
        if (a.data < b.data) {
            return -1
        }
        else {
            return true
        }
    })
}

function salvarLocalStorage(chave, bd_array) {
    localStorage.setItem(chave, JSON.stringify(bd_array))
}

function pegarLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave)) ?? [];
}

var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");

tab1.addEventListener("click", identificaTabs);
tab2.addEventListener("click", identificaTabs);

function identificaTabs(e) {
    containerTarefa.innerHTML = "";

    if (e.target.id == "tab2") {
        listarTarefas("listarConcluidas")
    }

    else {
        listarTarefas("listarPendentes")
    }
}

function listarTarefas(e) {
    if (e == "listarConcluidas") {
        console.log("concluiu")
    }

    else {
        let dadosPendentes = pegarLocalStorage("bd_pendentes");
        numtarefa = 0;
        for (i in dadosPendentes) {
            lista = dadosPendentes[i];
            data = new Date(lista.data);
            dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            numtarefa++
            criarDivTarefas();
        }
    }
}

function criarDivTarefas() {
    containerTarefa = document.getElementById("conteudoTarefa");
    containerTarefa.innerHTML +=
        `<div class="cardTarefa" data-numtarefa="${numtarefa}">
        <h4 class="mb-4" id="tituloCard">${lista.titulo}</h4>
        <p>${lista.conteudo}</p>
        <div class="opcoesCard" >
            <div class="form-check d-inline-block cursor">
                <input class="form-check-input cursor" type="checkbox"
                id="concluida${numtarefa}" data-numtarefa="${numtarefa}" class="ok">
                <label class="form-check-label cursor">Concluída</label>
            </div>
            <p class="d-inline-block cursor" id="excluir"><i class="bi-trash"></i> Excluir</p>
            <p id="data">${dataFormatada}</p>
        </div>
    </div>`;
}


// function tarefaConcluida(){

// }

try{
    var checkConcluida = document.getElementsByClassName("ok")
    checkConcluida.addEventListener("change", marcarConcluida)
}
catch (err){

}

// var teste = document.getElementsByClassName("cardTarefa")
// var atributo = teste[1]
// console.log(atributo.getAttribute("data-numtarefa"))

function marcarConcluida(e){
    if(checkConcluida.checked){
        console.log(this.dataset.numtarefa)


    }
    else{
        console.log("Não marcado")
    }
}

// var dadosPendentes = pegarLocalStorage("bd_pendentes");
// for (i in dadosPendentes) {
//     lista = dadosPendentes[i];
//     // console.log(lista.titulo)
//     if(lista.titulo == "teste 2"){
//         console.log("if")
//         console.log(i)
//         console.log("ORIGINAL")
//         console.log(bd_pendentes)
//         console.log("ALTERADO")
//         bd_pendentes.splice(i, 1)
//         console.log(bd_pendentes)
//         salvarLocalStorage("bd_pendentes", bd_pendentes);
//         listarTarefas("listarPendentes");
//     }
//     else{

//     }



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
        janelaModal.classList.remove("abreModal")
    }
}
