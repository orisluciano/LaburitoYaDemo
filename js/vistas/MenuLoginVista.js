import ModalLogin from "./ModalLogin.js";
import PerfilTrabajadorVista from "./PerfilTrabajadorVista.js";
import SloganVista from "./SloganVista.js";
import SugerenciaVista from "./SugereciasVista.js";

class MenuLoginVista {
    dir = "./html/menuLogin.html";
    ids = { 
        btnLogin : "btnLogin",
        btnCuenta : "btnCuenta",
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
        let btnLogin = document.getElementById(this.ids.btnLogin);
        btnLogin.onclick = function() {
            esto.btnLoginOnClick();           
        };
        let btnCuenta = document.getElementById(this.ids.btnCuenta);
        btnCuenta.onclick = function() {
            esto.btnCuentaOnclick();
        };
    }

    btnLoginOnClick(){
        let login = new ModalLogin();
        login.CargarVista();
    }

    btnCuentaOnclick(){
        alert("Proximamente");
    }
}

export default MenuLoginVista;