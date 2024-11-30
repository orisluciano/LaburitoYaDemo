import BuscadorVista from "./BuscadorVista.js";
import ModalBase from "./ModalBase.js";

class SloganVista {
    dir = "./html/slogan.html";
    ids = { 
        btnBuscador : "btnBuscador",
        btnPublicar : "btnPublicar"
    };

    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("root");
        root.innerHTML = "";
        root.innerHTML = await vista;
        this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscador = document.getElementById(this.ids.btnBuscador);
        btnBuscador.onclick = function() {
            esto.abrirBuscador();
        }
        let btnPublicar = document.getElementById(this.ids.btnPublicar);
        btnPublicar.onclick = function() {
            esto.abrirInicio();
        }
    }

    abrirBuscador(){
        let buscador = new BuscadorVista();
        buscador.CargarVista();
    }

    abrirInicio(){
        let inicio = new ModalBase();
        inicio.abrirModal("Inicio");
    }
}

export default SloganVista;