import ModalBase from "./ModalBase.js";

class ModalLogin {
    dir = "./html/modalLogin.html";
    ids = { 
        txtUser : "txtUser",
        txtPass : "txtPass",
        btnIngresar : "btnIngresar"
    };
    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let inicio = new ModalBase;
        await inicio.abrirModal(vista);
        //this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnLogin = document.getElementById(this.ids.btnLogin);
        btnLogin.onclick = function() {
            esto.abrirLogin();
        }
        let btnCuenta = document.getElementById(this.ids.btnCuenta);
        btnCuenta.onclick = function() {
            esto.crearCuenta();
        }
    }
}

export default ModalLogin;