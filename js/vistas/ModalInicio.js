import ModalBase from "./ModalBase.js";

class ModalInicio {
    dir = "./html/modalInicio.html";
    ids = { 
        btnLogin : "btnLogin",
        btnCuenta : "btnCuenta"
    };
    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let inicio = new ModalBase();
        await inicio.abrirModal(vista);
        this.cargarFunciones();
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

    abrirLogin(){
        alert("Login");
    }

    crearCuenta(){
        alert("crearCuenta");
    }
}

export default ModalInicio;