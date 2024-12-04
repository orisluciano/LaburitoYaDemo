class LoginServicio {
    dir = "./recursos/datos/usuarios.json";
    constructor() {
        
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
            }
        });
        return bandera;
    }
}

export default LoginServicio;