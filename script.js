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
    if(e.target.id == "cancelar" || e.target.id == "janelaModal"){
        janelaModal.classList.remove("abreModal")
    }
};
