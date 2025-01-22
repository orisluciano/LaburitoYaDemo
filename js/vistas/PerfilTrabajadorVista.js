import TokenServicio from "../aplicacion/servicios/TokenServicio.js";
import TrabajadorServicio from "../aplicacion/servicios/TrabajadorServicio.js";
import TrabajadorUsuarioServicio from "../aplicacion/servicios/TrabajadorUsuarioServicio.js";

class PerfilTrabajadorVista {
    dir = "./html/perfilTrabajador.html";
    ids = {
        btnEditarApiNom : "btnEditarApiNom",
        btnCancelarApiNom : "btnCancelarApiNom",
        btnModificarApiNom : "btnModificarApiNom",
        btnNombre : "btnNombre",
        btnRubros : "btnRubros",
        btnZonas : "btnZonas",
        btnContactos : "btnContactos",
        txtNombre : "txtNombre",
        txtApellido : "txtApellido",
        listaRubros : "listaRubros",
        listaZonas : "listaZonas",
        listaContactos : "listaContactos",
        divApiNom : "divApiNom",
        divModApiNom : "divModApiNom"
    };
    datos = {
        id : null,
        nombre : "",
        apellido : ""
    };
    trabajadorService = new TrabajadorServicio();
    trabajadorUsuarioService = new TrabajadorUsuarioServicio();
    tokenService = new TokenServicio();

    constructor() {
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("root");
        root.innerHTML = "";
        root.innerHTML = await vista;
        this.cargarFunciones();
        this.cargarDatos();
    }

    async cargarDatos(){
        this.cargarTrabajador();
    }

    mostrarDatos(nombre, apellido){
        let txtNombre = document.getElementById(this.ids.txtNombre);
        txtNombre.value = nombre;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        txtApellido.value = apellido;
    }

    cargarFunciones(){
        let esto = this;
        let btnModificarApiNom = document.getElementById(this.ids.btnModificarApiNom);
        btnModificarApiNom.onclick = function() {
            esto.btnModificarApiNomOnClick();
        }
        let btnEditarApiNom = document.getElementById(this.ids.btnEditarApiNom);
        btnEditarApiNom.onclick = function() {
            esto.btnEditarApiNomOnClick();
        }
        let btnCancelarApiNom = document.getElementById(this.ids.btnCancelarApiNom);
        btnCancelarApiNom.onclick = function() {
            esto.btnCancelarrApiNomOnClick();
        }
        let btnNombre = document.getElementById(this.ids.btnNombre);
        btnNombre.onclick = function() {
            alert("proximamente");
        }
        let btnRubros = document.getElementById(this.ids.btnRubros);
        btnRubros.onclick = function() {
            alert("proximamente");
        }
        let btnZonas = document.getElementById(this.ids.btnZonas);
        btnZonas.onclick = function() {
            alert("proximamente");
        }
        let btnContactos = document.getElementById(this.ids.btnContactos);
        btnContactos.onclick = function() {
            alert("proximamanete");
        }
    }

    async cargarTrabajador(){
        let userId = this.tokenService.parseJwt().userId;
        let resServ = await this.trabajadorUsuarioService.buscarPorUsuarioId(userId);
        if (resServ.errores.length > 0) {
            let mensaje = "Hubo un error al cargar los datos del trabajador";
            this.mostrarDatos(mensaje, mensaje);
        } else {
            if (resServ.respuesta.resultados.length > 0) {
                let trabajadorUser = resServ.respuesta.resultados[0];
                let trabServ = await this.trabajadorService.buscarPorId(trabajadorUser.trabajadorId);
                let trabajador = trabServ.respuesta;
                this.datos.id = trabajadorUser.trabajadorId;
                this.mostrarDatos(trabajador.nombre, trabajador.apellido);   
            } else {
                let btnModificarApiNom = document.getElementById(this.ids.btnModificarApiNom);
                btnModificarApiNom.innerHTML = "Crear trabajador";
            }
        }
    }

    btnModificarApiNomOnClick(){
        let divApiNom = document.getElementById(this.ids.divApiNom);
        divApiNom.className = "displayFlex";
        let divModApiNom = document.getElementById(this.ids.divModApiNom);
        divModApiNom.className = "displayNone";
        let txtNombre = document.getElementById(this.ids.txtNombre);
        txtNombre.disabled = false;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        txtApellido.disabled = false;
    }

    async btnEditarApiNomOnClick(){
        let txtNombre = document.getElementById(this.ids.txtNombre);
        let nombre = txtNombre.value;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        let apellido = txtApellido.value;
        this.datos.apellido = apellido;
        this.datos.nombre = nombre;
        let res;
        if (this.datos.id === null) {
            res = await this.trabajadorService.nuevoTrabajador(this.datos);
        } else {
            res = await this.trabajadorService.modificarTrabajador(this.datos);
        }
        if (res.errores.length > 0) {
            res.errores.forEach(e => {
                alert(e);
            });
        } else {
            res.mensajes.forEach(e => {
                alert(e);
            });
            this.btnCancelarrApiNomOnClick();
        }
    }

    btnCancelarrApiNomOnClick(){
        let divApiNom = document.getElementById(this.ids.divApiNom);
        divApiNom.className = "displayNone";
        let divModApiNom = document.getElementById(this.ids.divModApiNom);
        divModApiNom.className = "";
        let txtNombre = document.getElementById(this.ids.txtNombre);
        txtNombre.disabled = true;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        txtApellido.disabled = true;
    }
}

export default PerfilTrabajadorVista;