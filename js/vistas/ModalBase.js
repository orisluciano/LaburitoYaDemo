class ModalBase {
    id = {
        modal : "modal",
        btnCerrarModal : "btnCerrarModal",
        contenidoModal : "contenidoModal"

    };
    archivo = "./html/modalBase.html"
    constructor() {
        
    }

    async abrirModal(){
        let res = await fetch(this.archivo);
        let vista = await res.text();
        let modal = document.getElementById(this.id.modal);
        modal.innerHTML = "";
        modal.innerHTML = await vista;
        this.funcionesModal();
    }

    funcionesModal(){
        let btnCerrar = document.getElementById(this.id.btnCerrarModal);
        btnCerrar.onclick = function () {
            alert("proximamente");
        }
    }

    llenarModal(contenido){
        let contenidoModal = document.getElementById(this.id.contenidoModal);
        contenidoModal.innerHTML = "";
        contenidoModal.innerHTML = contenido;
    }
}

export default ModalBase;