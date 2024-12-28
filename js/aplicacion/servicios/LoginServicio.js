import TokenServicio from "./TokenServicio.js";

class LoginServicio {
    dir = "./recursos/datos/usuarios.json";
    api = "http://localhost/backendlaburitoya/api/login";
    tokenService = new TokenServicio();

    constructor() {
        
    }

    async login(usuario, contraseña){
        let res = {
            bandera : false,
            mensaje : ""
        };
        let body = {
            usuario : usuario,
            contraseña : contraseña
        }; 
        let peticion = await fetch(this.api,{
            method : "POST",
            body: JSON.stringify(body)
        });
        let json = await peticion.json();
        console.log(await json);
        if (await json.respuesta.token != null) {
            res.bandera = true;
            res.mensaje = "Bienvenido al sistema";
            this.tokenService.SetToken(await json.respuesta.token);
        } else {
            await json.errores.forEach(e => {
                res.mensaje = res.mensaje;
                res.mensaje = res.mensaje + ", " + e;
            });
        }
        return res;
    }

    async verificarIngreso(usuario, contraseña){
        let res = {
            bandera : false,
            mensaje : ""
        };
        if (await this.existeUsuario(usuario) === true) {
            if (await this.verificarContraseña(usuario, contraseña) === true) {
                res.bandera = true;
                res.mensaje = "Bienvenido al sistema";
            } else {
                res.mensaje = "La contraseña es incorrecta";
            }
        } else {
            res.mensaje = "El usuario no existe";
        }
        return res;
    }

    async existeUsuario(usuario){
        let bandera = false;
        let peticion = await fetch(this.dir);
        let lista = await peticion.json();
        lista.usuarios.forEach(e => {
            if (e.usuario === usuario) {
                bandera = true;
            }
        });
        return bandera;
    }

    async verificarContraseña(usuario, contraseña){
        let bandera = false;
        let peticion = await fetch(this.dir);
        let lista = await peticion.json();
        lista.usuarios.forEach(e => {
            if (e.usuario === usuario && e.pass=== contraseña) {
                bandera = true;
                this.guardarLogueo(e.usuario);
            }
        });
        return bandera;
    }

    guardarLogueo(usuario){
        localStorage.setItem("usuario", usuario);
    }

    logout(){
        localStorage.clear();
    }

    verificarLogueo(){
        let respuesta = {
            usuario : null,
            errores : null   
        }
        //let usuario = localStorage.getItem("LaburitoToken");
        let usuario = this.tokenService.GetToken();
        if (usuario != null) {
            respuesta.usuario = usuario;console.log(usuario);
        } else {
            respuesta.errores = "Usuario no logueado";
        }
        
        return respuesta;
    }
}

export default LoginServicio;