import TrabajadorContactoServicio from "../aplicacion/servicios/TrabajadorContactoServicio.js";
import TrabajadorOpinionServicio from "../aplicacion/servicios/TrabajadorOpinionServicio.js";
import TrabajadorRubroServicio from "../aplicacion/servicios/TrabajadorRubroServicio.js";
import ModalBase from "./ModalBase.js";
import OpinionVista from "./OpinionVista.js";

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
        btnOpiTrab.onclick = function(params) {
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
        /*await this.getRubrosByTrabajador();
        await this.getContactosByTrabajador();
        await this.getOpinionesByTrabajador();*/
    }

    async getRubrosByTrabajador(){
        let base = await this.trabajadorRubroServicio.BuscarRubrosPorTrabajador(this.datos.id);
        let divContenidoTrabajador = document.getElementById(this.ids.divContenidoTrabajador);
        divContenidoTrabajador.innerHTML = "";
        let rubros = document.createElement("ul");
        divContenidoTrabajador.appendChild(rubros);
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
        let divContenidoTrabajador = document.getElementById(this.ids.divContenidoTrabajador);
        divContenidoTrabajador.innerHTML = "";
        let rubros = document.createElement("ul");
        divContenidoTrabajador.appendChild(rubros);
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
        let divContenidoTrabajador = document.getElementById(this.ids.divContenidoTrabajador);
        divContenidoTrabajador.innerHTML = "";
        let rubros = document.createElement("ul");
        divContenidoTrabajador.appendChild(rubros);
        if (base.errores.length > 0) {
            let r = document.createElement("li");
            r.innerHTML = "Hubo un error. Intente de nuevo";
            rubros.appendChild(r);
        } else {
            if (base.respuesta.resultados.length > 0) {
                base.respuesta.resultados.forEach(e => {
                    let r = document.createElement("li");
                    let d = document.createElement("div");
                    d.className = "divLista";
                    r.appendChild(d);
                    let fecha = document.createElement("p");
                    fecha.innerHTML = "Fecha: " + e.fechaCreacion;
                    d.appendChild(fecha);
                    let calif = document.createElement("p");
                    let estrellas = "";
                    for (let index = 0; index < e.calificacion; index++) {
                        estrellas = estrellas + "*";
                    }
                    calif.innerHTML = "Calificacion: " + e.calificacion + "/5 " + estrellas;
                    d.appendChild(calif);
                    let o = document.createElement("p");
                    o.innerHTML = e.opinion;
                    d.appendChild(o);
                    rubros.appendChild(r);
                });   
            } else {
                let r = document.createElement("li");
                    r.innerHTML = "No hay elementos para mostrar";
                    rubros.appendChild(r);
            }
        }
    }

    mostrarRecurso(recurso){
        switch (recurso) {
            case "rubro":
                this.getRubrosByTrabajador();
                break;
            case "contacto":
                this.getContactosByTrabajador();
                break;
            case "opinion":
                this.getOpinionesByTrabajador();
                break;
            default:
                break;
        }
    }

    async btnRubroTrabOnClick(){
        //await this.getRubrosByTrabajador();
        let btnRubro = document.getElementById(this.ids.btnRubroTrab);
        btnRubro.className = "btnSolapa btnSolapaSel";
        let btnCon = document.getElementById(this.ids.btnContTrab);
        btnCon.className = "btnSolapa btnSolapaIzq";
        let btnOpi = document.getElementById(this.ids.btnOpiTrab);
        btnOpi.className = "btnSolapa";
        this.mostrarRecurso("rubro");
    }

    async btnContTrabOnClick(){
        //await this.getContactosByTrabajador();
        let btnRubro = document.getElementById(this.ids.btnRubroTrab);
        btnRubro.className = "btnSolapa btnSolapaDer";
        let btnCon = document.getElementById(this.ids.btnContTrab);
        btnCon.className = "btnSolapa btnSolapaSel";
        let btnOpi = document.getElementById(this.ids.btnOpiTrab);
        btnOpi.className = "btnSolapa btnSolapaIzq";
        this.mostrarRecurso("contacto");
    }

    async btnOpiTrabOnClick(){
        //await this.getOpinionesByTrabajador();
        let btnRubro = document.getElementById(this.ids.btnRubroTrab);
        btnRubro.className = "btnSolapa";
        let btnCon = document.getElementById(this.ids.btnContTrab);
        btnCon.className = "btnSolapa btnSolapaDer";
        let btnOpi = document.getElementById(this.ids.btnOpiTrab);
        btnOpi.className = "btnSolapa btnSolapaSel";
        this.mostrarRecurso("opinion");
        this.cargarOpinionVista();
    }

    cargarOpinionVista(){
        let opi = new OpinionVista();
        opi.CargarVista();
    }
}

export default ModalTrabajador;