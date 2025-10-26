import NombreHost from "../utiles/NombreHost.js";
import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "./TokenServicio.js";


class FavoritoServicio {
    host = new NombreHost();
    dir = this.host.nombre + "favoritos/";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    nuevo(fvorito){
        alert("no implementado");
    }

    modificar(fvorito){
        alert("no implementado");
    }

    eliminar(id){
        alert("no implementado");
    }

    buscar(desde, hasta){
        alert("no implementado");
    }

    buscarPorId(id){
        alert("no implementado");
    }

    async buscarPorUsuario(id){
        let dir = this.dir + "usuario/" + id;
        let base = await this.peticiones.getWithToken(dir, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }
}

export default FavoritoServicio;