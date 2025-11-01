import FavoritoServicio from "../aplicacion/servicios/FavoritoServicio.js";
import TrabajadorContactoServicio from "../aplicacion/servicios/TrabajadorContactoServicio.js";
import ModalBase from "./ModalBase.js";

class ModalFavorito {
    dir = "./html/modalFavorito.html";
    ids = { nombreTrabajador : "nombreTrabajador",
        descripTrabajador : "descripTrabajador",
        rubrosTrabajador : "rubrosTrabajador",
        contactoTrabajador : "contactoTrabajador",
        opinionTrab : "opinionTrab",
        divContenidoTrabajador : "divContenidoTrabajador",
        btnRubroTrab : "btnRubroTrab",
        btnContTrab : "btnContTrab",
        btnOpiTrab : "btnOpiTrab",
        divModalTrab : "divModalTrab",
        divContactosFavs : "divContactosFavs"
    }
    favorito = {
        descripcion : null,
        etiqueta : null,
        fechaCreacion : null,
        fechaModif : null,
        id : null,
        trabajadorId : null,
        usuarioId : null
    }
    base = new ModalBase();
    favServicio = new FavoritoServicio();
    contactoServicio = new TrabajadorContactoServicio();

    constructor(datos) {
        this.favorito.id = datos.id;
        this.favorito.etiqueta = datos.etiqueta;
        this.favorito.descripcion = datos.descripcion;
        this.favorito.fechaCreacion = datos.fechaCreacion;
        this.favorito.fechaModif = datos.fechaModif;
        this.favorito.trabajadorId = datos.trabajadorId;
        this.favorito.usuarioId = datos.usuarioId;
    }

    async cargarVista(){
        let res = await fetch(this.dir);
        let vista = await res.text();
        await this.base.abrirModal(vista);
        this.mostrarDatos();
        //this.cargarFunciones();
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
        nombre = "";
        nombre = this.favorito.etiqueta;
        let descripcion = document.getElementById(this.ids.descripTrabajador);
        descripcion.innerHTML = "";
        descripcion.innerHTML = this.favorito.descripcion;
        this.mostrarContactos();
        /*await this.getRubrosByTrabajador();
        await this.getContactosByTrabajador();
        await this.getOpinionesByTrabajador();*/
    }

    async mostrarContactos() {
        let contactos = await this.contactoServicio.BuscarContactosPorTrabajador(this.favorito.trabajadorId);
        let contenido = document.getElementById(this.ids.divContactosFavs);
        contenido.innerHTML = "";
        if (contactos.errores.length === 0) {
            let ul = document.createElement("ul");
            contenido.appendChild(ul);
            contactos.respuesta.resultados.forEach(e => {
                let li = document.createElement("li");
                li.className = "displayFlex centrarContenido width100";
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
                    li.appendChild(link);
                ul.appendChild(li);
            });
        } else {
            let mensaje = "";
            contactos.errores.forEach(e => {
                mensaje = e + ". ";
            });
            contenido.innerHTML = mensaje;
        }     
    }
}

export default ModalFavorito;