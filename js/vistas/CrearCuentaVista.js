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
        let listaCampos = [];
        let txtMail = document.getElementById(this.ids.txtMail);
        listaCampos.push(txtMail.value);
        let txtUser = document.getElementById(this.ids.txtUser);
        listaCampos.push(txtUser.value);
        let txtPass = document.getElementById(this.ids.txtPass);
        listaCampos.push(txtPass.value);
        let txtPass2 = document.getElementById(this.ids.txtPass2);
        listaCampos.push(txtPass2.value);
        let slcMail = document.getElementById(this.ids.slcMail);
        if (this.camposVacios(listaCampos)) {
            alert("Hay uno o mas campos vacios");
        } else {
            if (this.verificarContaseñas(txtPass.value, txtPass2.value)) {
                let user = {
                    "usuario": txtUser.value,
                    "tipoUsuarioId": 2,
                    "pass" : txtPass.value,
                    "mail" : txtMail.value + "@" + slcMail.value
                }
                let servicio = new UsuarioServicio();
                let res = await servicio.crear(user);
                if (res.errores.length > 0) {
                    alert(res.errores[0]);
                } else {
                    alert(res.mensajes[0]);
                }
            } else {
                alert("Las contraseñas no coinciden");
            }
        }
    }

    camposVacios(lista){
        let bandera = false;
        lista.forEach(e => {
            if (e === "") {
                bandera = true;
            }
        });
        return bandera;
    }

    verificarContaseñas(pass, pass2){
        return(pass === pass2);
    }
}

export default CrearCuentaVista;