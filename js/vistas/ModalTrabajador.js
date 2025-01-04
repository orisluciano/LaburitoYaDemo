import ModalBase from "./ModalBase.js";

class ModalTrabajador {
    dir = "./html/modalTrabajador.html";
    ids = { nombreTrabajador : "nombreTrabajador",
        descripTrabajador : "descripTrabajador",
        rubrosTrabajador : "rubrosTrabajador",
        contactoTrabajador : "contactoTrabajador",
        opinionTrab : "opinionTrab"
    }
    base = new ModalBase();
    datos = {
        id : null,
        nombre :"",
        apellido :""
    };
    constructor(datos) {
        this.datos.id = datos.id;
        this.datos.nombre = datos.nombre;
        this.datos.apellido = datos.apellido;
    }

    async cargarVista(){
        let res = await fetch(this.dir);
        let vista = await res.text();
        await this.base.abrirModal(vista);
        this.mostrarDatos();
    }

    mostrarDatos(){
        let nombre = document.getElementById(this.ids.nombreTrabajador);
        nombre.innerHTML = "";
        nombre.innerHTML = this.datos.nombre + " " + this.datos.apellido;
    }
}

export default ModalTrabajador;