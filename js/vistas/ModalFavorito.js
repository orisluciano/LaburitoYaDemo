import FavoritoServicio from "../aplicacion/servicios/FavoritoServicio.js";
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
        divModalTrab : "divModalTrab"
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
}

export default ModalFavorito;