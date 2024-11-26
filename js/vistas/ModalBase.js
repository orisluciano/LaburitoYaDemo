class ModalBase {
    id = {
        modal : "modal",
        btnCerrarModal : "btnCerrarModal",
        contenidoModal : "contenidoModal"

    };
    archivo = "./html/modalBase.html"
    constructor() {
        
    }

    async abrirModal(contenido){
        let res = await fetch(this.archivo);
        let vista = await res.text();
        let modal = document.getElementById(this.id.modal);
        modal.innerHTML = "";
        modal.innerHTML = await vista;
        modal.style.display = "block";
        this.funcionesModal();
        this.llenarModal(contenido);
    }

    funcionesModal(){
        let esto = this;
        let btnCerrar = document.getElementById(this.id.btnCerrarModal);
        btnCerrar.onclick = function () {
            let modal = document.getElementById(esto.id.modal);
            modal.style.display = "none";
        }
    }

    llenarModal(contenido){
        let contenidoModal = document.getElementById(this.id.contenidoModal);
        contenidoModal.innerHTML = "";
        contenidoModal.innerHTML = contenido;
    }
}

export default ModalBase;