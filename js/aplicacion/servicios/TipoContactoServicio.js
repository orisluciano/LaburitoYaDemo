import NombreHost from "../utiles/NombreHost.js";
import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "../servicios/TokenServicio.js";

class TipoContactoServicio {
    host = new NombreHost();
    dir = this.host.nombre + "tipocontacto";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + "/" + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}

export default TipoContactoServicio;