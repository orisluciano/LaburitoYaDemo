import TrabajadorContactoServicio from "../aplicacion/servicios/TrabajadorContactoServicio.js";
import TrabajadorOpinionServicio from "../aplicacion/servicios/TrabajadorOpinionServicio.js";
import TrabajadorRubroServicio from "../aplicacion/servicios/TrabajadorRubroServicio.js";
import ModalBase from "./ModalBase.js";

class ModalTrabajador {
    dir = "./html/modalTrabajador.html";
    ids = { nombreTrabajador : "nombreTrabajador",
        descripTrabajador : "descripTrabajador",
        rubrosTrabajador : "rubrosTrabajador",
        contactoTrabajador : "contactoTrabajador",
        opinionTrab : "opinionTrab",
        divContenidoTrabajador : "divContenidoTrabajador",
        btnRubroTrab : "btnRubroTrab",
        btnContTrab : "btnContTrab",
        btnOpiTrab : "btnOpiTrab"
    }
    base = new ModalBase();
    datos = {
        id : null,
        nombre : "",
        apellido : "",
        descripcion : "",
        rubros : null,
        contactos : null,
        opiniones : null
    };
    trabajadorRubroServicio = new TrabajadorRubroServicio();
    trabajadorContactoServicio = new TrabajadorContactoServicio();
    trabajadorOpinionServicio = new TrabajadorOpinionServicio();

    constructor(datos) {
        this.datos.id = datos.id;
        this.datos.nombre = datos.nombre;
        this.datos.apellido = datos.apellido;
        this.datos.descripcion = datos.descripcion;
    }

    async cargarVista(){
        let res = await fetch(this.dir);
        let vista = await res.text();
        await this.base.abrirModal(vista);
        this.mostrarDatos();
        this.cargarFunciones();
    }

    cargarFunciones(){
        let e = this;
        let btnRubroTrab = document.getElementById(this.ids.btnRubroTrab);
        btnRubroTrab.onclick = function(params) {
            e.btnRubroTrabOnClick();
        };
        let btnContTrab = document.getElementById(this.ids.btnContTrab);
        btnContTrab.onclick = function(params) {
            e.btnContTrabOnClick();
        };
        let btnOpiTrab = document.getElementById(this.ids.btnOpiTrab);
        btnContTrab.onclick = function(params) {
            e.btnOpiTrabOnClick();
        };
    }

    async mostrarDatos(){
        let nombre = document.getElementById(this.ids.nombreTrabajador);
        nombre.innerHTML = "";
        nombre.innerHTML = this.datos.nombre + " " + this.datos.apellido;
        let descripcion = document.getElementById(this.ids.descripTrabajador);
        descripcion.innerHTML = "";
        descripcion.innerHTML = this.datos.descripcion;
        await this.getRubrosByTrabajador();
        await this.getContactosByTrabajador();
        await this.getOpinionesByTrabajador();
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

    async getContactosByTrabajador(){
        let base = await this.trabajadorContactoServicio.BuscarContactosPorTrabajador(this.datos.id);
        let rubros = document.getElementById(this.ids.contactoTrabajador);
        if (base.errores.length > 0) {
            let r = document.createElement("li");
            r.innerHTML = "Hubo un error. Intente de nuevo";
            rubros.appendChild(r);
        } else {
            if (base.respuesta.resultados.length > 0) {
                base.respuesta.resultados.forEach(e => {
                    let r = document.createElement("li");
                    r.className = "displayFlex centrarContenido width100 "
                    let link = document.createElement("a");
                    link.className = "aLink cursorPointer";
                   if (e.tipoContacto === "Telefono/Celular" || e.tipoContacto === "Email") {
                        link.innerHTML = e.tipoContacto + ": " + e.descripcion;
                        link.onclick = function(p) {
                            navigator.clipboard.writeText(e.descripcion);
                            alert(e.tipoContacto + " copiado");
                        }
                   } else {
                        link.innerHTML = e.tipoContacto;
                        link.href = e.descripcion;
                   }
                    link.style.cursor = "pointer";
                    link.target = "_blank";
                    r.appendChild(link);
                    rubros.appendChild(r);
                });   
            } else {
                let r = document.createElement("li");
                    r.innerHTML = "No hay elementos para mostrar";
                    rubros.appendChild(r);
            }
        }
    }

    async getOpinionesByTrabajador() {
        let base = await this.trabajadorOpinionServicio.BuscarOpinionesPorTrabajador(this.datos.id, 0, 10);
        let rubros = document.getElementById(this.ids.opinionTrab);
        if (base.errores.length > 0) {
            let r = document.createElement("li");
            r.innerHTML = "Hubo un error. Intente de nuevo";
            rubros.appendChild(r);
        } else {
            if (base.respuesta.resultados.length > 0) {
                base.respuesta.resultados.forEach(e => {
                    let r = document.createElement("li");
                    r.innerHTML = e.opinion;
                    rubros.appendChild(r);
                });   
            } else {
                let r = document.createElement("li");
                    r.innerHTML = "No hay elementos para mostrar";
                    rubros.appendChild(r);
            }
        }
    }

    btnRubroTrabOnClick(){
        alert();
    }

    btnContTrabOnClick(){
        alert();
    }

    btnOpiTrabOnClick(){
        alert();
    }
}

export default ModalTrabajador;