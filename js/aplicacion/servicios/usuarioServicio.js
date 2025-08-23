import NombreHost from "../utiles/NombreHost.js";
import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "../servicios/TokenServicio.js";

class UsuarioServicio {
    host = new NombreHost();
    dir = this.host.nombre + "usuario";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();
    constructor(parameters) {
        
    }

    async crear(usuario){
        let dir = this.dir;
        let base = await this.peticiones.peticionesVarias(dir, "POST", usuario, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }

    async modificar(usuario){
        let dir = this.dir;
        let base = await this.peticiones.peticionesVarias(dir, "PUT", usuario, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }

    eliminar(id){
        alert("Proximamente");
    }
}

export default UsuarioServicio;