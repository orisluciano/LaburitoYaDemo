import ModalBase from "./ModalBase.js";

class ModalTrabajador {
    archivo = "./html/modalTrabajador.html";
    ids = { nombreTrabajador : "nombreTrabajador",
        descripTrabajador : "descripTrabajador",
        contactoTrabajador : "contactoTrabajador"
    }
    base = new ModalBase();
    constructor(parameters) {
        
    }

    cargar(){
        this.base.abrirModal();
        this.base.llenarModal("algo");
    }
}

export default ModalTrabajador;