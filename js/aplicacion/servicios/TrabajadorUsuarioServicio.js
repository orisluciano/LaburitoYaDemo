import NombreHost from "../utiles/NombreHost.js";
import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "../servicios/TokenServicio.js";

class TrabajadorUsuarioServicio {
    host = new NombreHost();
    dir = this.host.nombre + "trabajador/";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    async nuevoTrabajadorUsuario(trabajador) {
        let dir = this.dir;
        let base = await this.peticiones.peticionesVarias(dir, "POST", trabajador, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }

    nodificarTrabajadorUsuario(trabajador){
        alert("No Implementado");
    }

    eliminarTrabajadorUsuario(id){
        alert("No Implementado");
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }

    buscarPorId(id){
        alert("No Implementado");
    }

    async buscarPorUsuarioId(id){
        let dir = this.dir + "usuario/"+ id;
        let base = await this.peticiones.getWithToken(dir, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }
}

export default TrabajadorUsuarioServicio;