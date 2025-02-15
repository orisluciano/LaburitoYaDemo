import LoginServicio from "../aplicacion/servicios/LoginServicio.js";
import BuscadorVista from "./BuscadorVista.js";
import ConfigUsuarioVista from "./ConfigUsuarioVista.js";
import InicioVista from "./InicioVista.js";
import PerfilTrabajadorVista from "./PerfilTrabajadorVista.js";
import SloganVista from "./SloganVista.js";
import SugerenciaVista from "./SugereciasVista.js";

class MenuVista {
    dir = "./html/menu.html";
    ids = { 
        btnBuscador : "btnBuscador",
        btnTrabajador : "btnTrabajador",
        btnOferta : "btnOferta",
        btnConfigUSer : "btnConfigUSer",
        btnSugerencias : "btnSugerencias",
        btnConfig : "btnConfig",
        btnsalir : "btnSalir",
        contenidoMenu : "contenidoMenu",
        divMenu : "divMenu"
    };
    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let menu = document.getElementById(this.ids.contenidoMenu);
        menu.innerHTML = "";
        menu.innerHTML = await vista;
        let div = document.getElementById(this.ids.divMenu);
        div.className = "divMenu dropdown";
        let root = document.getElementById("root");
        root.innerHTML = "";
        this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscador = document.getElementById(this.ids.btnBuscador);
        btnBuscador.onclick = function() {
            esto.btnBuscadorOnClick();
        }
        let btnTrabajador = document.getElementById(this.ids.btnTrabajador);
        btnTrabajador.onclick = function() {
            esto.btnTrabajadorOnClick();           
        }
        let btnOferta = document.getElementById(this.ids.btnOferta);
        btnOferta.onclick = function() {
            esto.btnOfertaOnclick();
        }
        let btnConfigUSer = document.getElementById(this.ids.btnConfigUSer);
        btnConfigUSer.onclick = function() {
            esto.btnConfigUSerOnClick();
        }
        let btnSugerencias = document.getElementById(this.ids.btnSugerencias);
        btnSugerencias.onclick = function() {
            esto.btnSugerencias();
        }
        let btnSalir = document.getElementById(this.ids.btnsalir);
        btnSalir.onclick = function() {
            esto.btnsalir();
        }
    }

    btnBuscadorOnClick(){
        let buscador = new BuscadorVista();
        buscador.CargarVista();
    }

    btnTrabajadorOnClick(){
        let trabajador = new PerfilTrabajadorVista();
        trabajador.CargarVista();
    }

    btnOfertaOnclick(){
        alert("Proximamente");
    }

    btnConfigUSerOnClick(){
        let configs = new ConfigUsuarioVista();
        configs.CargarVista();
    }

    btnSugerencias(){
        let sugerencia = new SugerenciaVista();
        sugerencia.CargarVista();
    }

    btnsalir(){
        let loginService = new LoginServicio();
        loginService.logout();
        let inicio = new InicioVista();
        inicio.iniciarApp();
    }
}

export default MenuVista;