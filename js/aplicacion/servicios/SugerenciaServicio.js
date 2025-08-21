import NombreHost from "../utiles/NombreHost.js";
import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "./TokenServicio.js";

class SugerenciaServicio {
    host = new NombreHost();
    dir = this.host.nombre + "sugerencia";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    async Nuevo(sugerencia) {
        sugerencia.usuarioId = this.tokenService.parseJwt().userId;
        let base = await this.peticiones.peticionesVarias(this.dir, "POST", sugerencia, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }

    Modificar(sugerencia){
        alert("No Implementado");
    }

    Eliminar(id){
        alert("No Implementado");
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }

    async BuscarPorId(id){
        let dir = this.host.nombre + "trabajador/" + id;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}

export default SugerenciaServicio;