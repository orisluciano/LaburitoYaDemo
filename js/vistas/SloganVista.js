import BuscadorVista from "./BuscadorVista.js";

class SloganVista {
    dir = "./html/slogan.html";
    ids = { 
        btnIngresar : "btnIngresar",
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
        let btnIngresar = document.getElementById(this.ids.btnIngresar);
        btnIngresar.onclick = function() {
            esto.abrirBuscador();
        }
    }

    abrirBuscador(){
        let buscador = new BuscadorVista();
        buscador.CargarVista();
    }
}

export default SloganVista;