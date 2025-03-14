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
        btnCancelarPass : "btnCancelarPass",
        txtMailConfig : "txtMailConfig",
        slcMailConfig : "slcMailConfig",
        divCambiarMail : "divCambiarMail",
        btnMail : "btnMail",
        btnCambiarMail : "btnCambiarMail",
        btnCancelarMail : "btnCancelarMail",
        divBtnMail : "divBtnMail",
        divPassMail : "divPassMail",
        txtPassMail : "txtPassMail"
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
        let btnMail = document.getElementById(this.ids.btnMail);
        btnMail.onclick = function() {
            esto.btnMailOnClick();
        };
        let btnCambiarMail = document.getElementById(this.ids.btnCambiarMail);
        btnCambiarMail.onclick = function() {
            esto.btnCambiarMailOnClick();
        };
        let btnCancelarMail = document.getElementById(this.ids.btnCancelarMail);
        btnCancelarMail.onclick = function() {
            esto.btnCancelarMail();
        };
    }

    btnNombreOnClick(){
        this.btnCancelarPassOnClick();
        this.btnCancelarMail();
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
            passActual : txtPass.value,
            mail : this.tokenService.parseJwt().mail
        };
        if (user.passActual === "") {
            alert("Ingrese su contraseña");
        } else {
            let res = await this.userService.modificar(user);
            if (res.errores.length > 0) {
                alert(res.errores[0]);
            } else {
                alert(res.mensajes[0]);
                this.cargarDatos();
                this.btnCancelarNombreOnClick();
                this.logout();
            }
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
        this.btnCancelarMail();
        let divContraseña = document.getElementById(this.ids.divContraseña);
        divContraseña.className = "displayNone";
        let divPass = document.getElementById(this.ids.divPass);
        divPass.className = "displayBlock";
        let divBtnPass = document.getElementById(this.ids.divBtnPass);
        divBtnPass.className = "displayFlex";
    }

    async btnCambiarPassOnclick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        let txtActual = document.getElementById(this.ids.txtActual);
        let txtNuevo = document.getElementById(this.ids.txtNuevo);
        let txtNuevo2 = document.getElementById(this.ids.txtNuevo2);
        let user = { 
            usuario : txtUser.value,
            pass : txtNuevo2.value,
            id : this.tokenService.parseJwt().userId,
            passActual : txtActual.value,
            nuevo : txtNuevo.value,
            nuevo2 : txtNuevo2.value,
            mail : this.tokenService.parseJwt().mail
        };
        let res = await this.userService.modificar(user);
        if (user.nuevo === "" || user.nuevo2 === "" || user.passActual === "") {
            alert("Hay campos vacios");
        } else {
            if (res.mensajes.length > 0 || null) {
                alert(res.mensajes[0]);
                this.cargarDatos();
                this.btnCancelarNombreOnClick();
                this.logout();
            } else {
                alert(res.errores[0]);
            }   
        }
    }

    btnCancelarPassOnClick(){
        let divContraseña = document.getElementById(this.ids.divContraseña);
        divContraseña.className = "marginBotton20";
        let divPass = document.getElementById(this.ids.divPass);
        divPass.className = "displayNone";
        let divBtnPass = document.getElementById(this.ids.divBtnPass);
        divBtnPass.className = "displayNone";
    }

    btnMailOnClick(){
        this.btnCancelarNombreOnClick();
        this.btnCancelarPassOnClick();
        let txtMailConfig = document.getElementById(this.ids.txtMailConfig);
        txtMailConfig.disabled = false;
        let slcMailConfig = document.getElementById(this.ids.slcMailConfig);
        slcMailConfig.disabled = false;
        let divCambiarMail = document.getElementById(this.ids.divCambiarMail);
        divCambiarMail.className = "displayNone";
        let divBtnMail = document.getElementById(this.ids.divBtnMail);
        divBtnMail.className = "displayFlex";
        let divPassMail = document.getElementById(this.ids.divPassMail);
        divPassMail.className = "borderDivInput marginBotton20";
    }

    async btnCambiarMailOnClick(){
        let txtMailConfig = document.getElementById(this.ids.txtMailConfig);
        let slcMailConfig = document.getElementById(this.ids.slcMailConfig);
        let txtPassMail = document.getElementById(this.ids.txtPassMail);
        let user = {
            usuario : this.tokenService.parseJwt().user,
            pass : txtPassMail.value,
            id : this.tokenService.parseJwt().userId,
            passActual : txtPassMail.value,
            mail : txtMailConfig.value + "@" + slcMailConfig.value
        };
        if (user.passActual === "") {
            alert("Ingrese su contraseña");
        } else {
            let res = await this.userService.modificar(user);
            if (res.errores.length > 0) {
                alert(res.errores[0]);
            } else {
                alert(res.mensajes[0]);
                this.cargarDatos();
                this.btnCancelarNombreOnClick();
                this.logout();
            }
        }
    }

    btnCancelarMail(){
        let txtMailConfig = document.getElementById(this.ids.txtMailConfig);
        txtMailConfig.disabled = true;
        let slcMailConfig = document.getElementById(this.ids.slcMailConfig);
        slcMailConfig.disabled = true;
        let divCambiarMail = document.getElementById(this.ids.divCambiarMail);
        divCambiarMail.className = "displayFlex";
        let divBtnMail = document.getElementById(this.ids.divBtnMail);
        divBtnMail.className = "displayNone";
        let divPassMail = document.getElementById(this.ids.divPassMail);
        divPassMail.className = "displayNone";
    }

    logout(){
        let loginService = new LoginServicio();
        loginService.logout();
        let inicio = new InicioVista();
        inicio.iniciarApp();
    }
}
export default ConfigUsuarioVista;