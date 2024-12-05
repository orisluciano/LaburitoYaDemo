import SloganVista from "./SloganVista.js";

class MenuVista {
    dir = "./html/menu.html";
    ids = { 
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

    btnTrabajadorOnClick(){
        alert("Proximamente");
    }

    btnOfertaOnclick(){
        alert("Proximamente");
    }

    btnConfigUSerOnClick(){
        alert("Proximamente");
    }

    btnSugerencias(){
        alert("Proximamanete");
    }

    btnsalir(){
        let div = document.getElementById(this.ids.divMenu);
        div.className = "divMenu";
        let slogan = new SloganVista();
        slogan.CargarVista();
    }
}

export default MenuVista;