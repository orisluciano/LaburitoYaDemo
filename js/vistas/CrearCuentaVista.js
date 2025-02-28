import UsuarioServicio from "../aplicacion/servicios/usuarioServicio.js";

class CrearCuentaVista {
    dir = "./html/crearCuenta.html";
    ids = {
        txtMail : "txtMail",
        slcMail : "slcMail",
        txtUser : "txtUser",
        txtPass : "txtPass",
        txtPass2 : "txtPass2",
        btnNuevaCuenta : "btnNuevaCuenta"
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
        //this.cargarDatos();
    }

    cargarDatos(){
        let token = this.tokenService.parseJwt();
        let txtUser = document.getElementById(this.ids.txtUser);
        txtUser.value = token.user;
    }

    cargarFunciones(){
        let esto = this;
        let btnNuevaCuenta = document.getElementById(this.ids.btnNuevaCuenta);
        btnNuevaCuenta.onclick = function() {
            esto.btnNuevaCuentaOnClick();
        };
    }

    async btnNuevaCuentaOnClick(){
        let txtMail = document.getElementById(this.ids.txtMail);
        let txtUser = document.getElementById(this.ids.txtUser);
        let txtPass = document.getElementById(this.ids.txtPass);
        let txtPass2 = document.getElementById(this.ids.txtPass2);
        let slcMail = document.getElementById(this.ids.slcMail);
        let user = {
            "usuario": txtUser.value,
            "tipoUsuarioId": 2,
            "pass" : txtPass.value,
            "mail" : txtMail.value + "@" + slcMail.value
        }
        let servicio = new UsuarioServicio();
        let res = await servicio.crear(user);
        console.log(res);
    }
}

export default CrearCuentaVista;