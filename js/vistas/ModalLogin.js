import LoginServicio from "../aplicacion/servicios/LoginServicio.js";
import MenuVista from "./MenuVista.js";
import ModalBase from "./ModalBase.js";

class ModalLogin {
    dir = "./html/modalLogin.html";
    ids = { 
        txtUser : "txtUser",
        txtPass : "txtPass",
        lblErrores : "lblErrores",
        btnIngresar : "btnIngresar"
    };
    loginService = new LoginServicio();
    modalBase = new ModalBase();

    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        await this.modalBase.abrirModal(vista);
        this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnIngresar = document.getElementById(this.ids.btnIngresar);
        btnIngresar.onclick = function() {
            esto.btnIngresarOnClick();
        }
    }

    async btnIngresarOnClick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        let txtPass = document.getElementById(this.ids.txtPass);
        //let res = await this.loginService.verificarIngreso(txtUser.value , txtPass.value);
        let res = await this.loginService.login(txtUser.value , txtPass.value);
        console.log(await res);
        if (res.bandera === true) {
            let menu = new MenuVista();
            menu.CargarVista();
            this.modalBase.cerrarModal();
        } else {
            let errores = document.getElementById(this.ids.lblErrores);
            errores.innerHTML = res.mensaje;
        }
    }
}

export default ModalLogin;