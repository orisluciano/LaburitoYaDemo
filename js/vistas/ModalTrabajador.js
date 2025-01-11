import TrabajadorRubroServicio from "../aplicacion/servicios/TrabajadorRubroServicio.js";
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
    trabajadorRubroServicio = new TrabajadorRubroServicio();

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

    async mostrarDatos(){
        let nombre = document.getElementById(this.ids.nombreTrabajador);
        nombre.innerHTML = "";
        nombre.innerHTML = this.datos.nombre + " " + this.datos.apellido;
        await this.getRubrosByTrabajador();
    }

    async getRubrosByTrabajador(){
        let base = await this.trabajadorRubroServicio.BuscarRubrosPorTrabajador(this.datos.id);
        let rubros = document.getElementById(this.ids.rubrosTrabajador);
        if (base.errores.length > 0) {
            let r = document.createElement("li");
            r.innerHTML = "Hubo un error. Intente de nuevo";
            rubros.appendChild(r);
        } else {
            if (base.respuesta.resultados.length > 0) {
                base.respuesta.resultados.forEach(e => {
                    let r = document.createElement("li");
                    r.innerHTML = e.descripcion;
                    rubros.appendChild(r);
                });   
            } else {
                let r = document.createElement("li");
                    r.innerHTML = "No hay elementos para mostrar";
                    rubros.appendChild(r);
            }
        }
    }
}

export default ModalTrabajador;