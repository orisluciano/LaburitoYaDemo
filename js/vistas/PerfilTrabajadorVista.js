import TokenServicio from "../aplicacion/servicios/TokenServicio.js";
import TrabajadorServicio from "../aplicacion/servicios/TrabajadorServicio.js";
import TrabajadorUsuarioServicio from "../aplicacion/servicios/TrabajadorUsuarioServicio.js";

class PerfilTrabajadorVista {
    dir = "./html/perfilTrabajador.html";
    ids = {
        btnEditar : "btnEditar",
        btnCancelar : "btnCancelar",
        btnNombre : "btnNombre",
        btnRubros : "btnRubros",
        btnZonas : "btnZonas",
        btnContactos : "btnContactos",
        txtNombre : "txtNombre",
        txtApellido : "txtApellido",
        listaRubros : "listaRubros",
        listaZonas : "listaZonas",
        listaContactos : "listaContactos"
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
        let txtApellido = document.getElementById(this.ids);
        txtApellido.value = apellido;
    }

    cargarFunciones(){
        let esto = this;
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
            let trabajadorUser = resServ.respuesta.resultados[0];
            let trabServ = await this.trabajadorService.buscarPorId(trabajadorUser.trabajadorId);
            let trabajador = trabServ.respuesta;
            this.mostrarDatos(trabajador.nombre, trabajador.apellido);
        }
    }
}

export default PerfilTrabajadorVista;