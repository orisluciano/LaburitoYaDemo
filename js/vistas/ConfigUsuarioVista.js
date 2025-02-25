import LoginServicio from "../aplicacion/servicios/LoginServicio.js";
import TokenServicio from "../aplicacion/servicios/TokenServicio.js";
import UsuarioServicio from "../aplicacion/servicios/usuarioServicio.js";
import InicioVista from "./InicioVista.js";

class ConfigUsuarioVista {
    dir = "./html/configUsuario.html";
    ids = {
        txtUser : "txtUser",
        divPassOriginal : "divPassOriginal",
        txtPass : "txtPass",
        divNombre : "divNombre",
        btnNombre : "btnNombre",
        divBtnUser : "divBtnUser",
        btnCambiarNombre : "btnCambiarNombre",
        btnCancelarNombre : "btnCancelarNombre",
        divContraseña : "divContraseña",
        btnPass : "btnPass",
        divPass : "divPass",
        txtActual : "txtActual",
        txtNuevo : "txtNuevo",
        txtNuevo2 : "txtNuevo2",
        divBtnPass : "divBtnPass",
        btnCambiarPass : "btnCambiarPass",
        btnCancelarPass : "btnCancelarPass"
    };
    tokenService = new TokenServicio();
    userService = new UsuarioServicio();

    constructor(parameters) {
        
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

    cargarDatos(){
        let token = this.tokenService.parseJwt();
        let txtUser = document.getElementById(this.ids.txtUser);
        txtUser.value = token.user;
    }

    cargarFunciones(){
        let esto = this;
        let btnNombre = document.getElementById(this.ids.btnNombre);
        btnNombre.onclick = function() {
            esto.btnNombreOnClick();
        };
        let btnCambiarNombre = document.getElementById(this.ids.btnCambiarNombre);
        btnCambiarNombre.onclick = function() {
            esto.btnCambiarNombreOnclick();
        };
        let btnCancelarNombre = document.getElementById(this.ids.btnCancelarNombre);
        btnCancelarNombre.onclick = function() {
            esto.btnCancelarNombreOnClick();
        };
        let btnPass = document.getElementById(this.ids.btnPass);
        btnPass.onclick = function() {
            esto.btnPassOnClick();
        };
        let btnCambiarPass = document.getElementById(this.ids.btnCambiarPass);
        btnCambiarPass.onclick = function() {
            esto.btnCambiarPassOnclick();
        };
        let btnCancelarPass = document.getElementById(this.ids.btnCancelarPass);
        btnCancelarPass.onclick = function() {
            esto.btnCancelarPassOnClick();
        };
    }

    btnNombreOnClick(){
        this.btnCancelarPassOnClick();
        let txtUser = document.getElementById(this.ids.txtUser);
        txtUser.disabled = false;
        let divPassOriginal = document.getElementById(this.ids.divPassOriginal);
        divPassOriginal.className = "borderDivInput marginBotton20";
        let txtPass = document.getElementById(this.ids.txtPass);
        txtPass.innerHTML = "";
        let divBtnUser = document.getElementById(this.ids.divBtnUser);
        divBtnUser.className = "displayFlex marginBotton20";
        let divNombre = document.getElementById(this.ids.divNombre);
        divNombre.className = "displayNone";
    }

    async btnCambiarNombreOnclick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        let txtPass = document.getElementById(this.ids.txtPass);
        let user = {
            usuario : txtUser.value,
            pass : txtPass.value,
            id : this.tokenService.parseJwt().userId,
            passActual : txtPass.value
        };
        let res = await this.userService.modificar(user);
        if (res.mensajes.length > 0) {
            alert(res.mensajes[0]);
            console.log(res);
            this.cargarDatos();
            this.btnCancelarNombreOnClick();
            this.logout();
        } else {
            alert(res.errores[0]);
        }
    }

    btnCancelarNombreOnClick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        txtUser.disabled = true;
        let divPassOriginal = document.getElementById(this.ids.divPassOriginal);
        divPassOriginal.className = "displayNone";
        let txtPass = document.getElementById(this.ids.txtPass);
        txtPass.innerHTML = "";
        let divBtnUser = document.getElementById(this.ids.divBtnUser);
        divBtnUser.className = "displayNone";
        let divNombre = document.getElementById(this.ids.divNombre);
        divNombre.className = "marginBotton20";
    }

    btnPassOnClick(){
        this.btnCancelarNombreOnClick();
        let divContraseña = document.getElementById(this.ids.divContraseña);
        divContraseña.className = "displayNone";
        let divPass = document.getElementById(this.ids.divPass);
        divPass.className = "displayBlock";
        let divBtnPass = document.getElementById(this.ids.divBtnPass);
        divBtnPass.className = "displayFlex";
    }

    btnCambiarPassOnclick(){
        let txtActual = document.getElementById(this.ids.txtActual);
        let txtNuevo = document.getElementById(this.ids.txtNuevo);
        let txtNuevo2 = document.getElementById(this.ids.txtNuevo2);
        let user = { actual : txtActual.value,
            nuevo : txtNuevo.value,
            nuevo2 : txtNuevo2.value
        };
        console.log(user);
        this.btnCancelarPassOnClick();
    }

    btnCancelarPassOnClick(){
        let divContraseña = document.getElementById(this.ids.divContraseña);
        divContraseña.className = "marginBotton20";
        let divPass = document.getElementById(this.ids.divPass);
        divPass.className = "displayNone";
        let divBtnPass = document.getElementById(this.ids.divBtnPass);
        divBtnPass.className = "displayNone";
    }

    logout(){
        let loginService = new LoginServicio();
        loginService.logout();
        let inicio = new InicioVista();
        inicio.iniciarApp();
    }
}
export default ConfigUsuarioVista;