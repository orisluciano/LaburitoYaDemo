import NombreHost from "../utiles/NombreHost.js";
import PeticionesHttp from "../utiles/PeticionesHttp.js";


class FavoritoServicio {
    host = new NombreHost();
    dir = this.host.nombre + "favoritos/";
    peticiones = new PeticionesHttp();

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

    buscarPorUsuario(id){
        alert("no implementado");
    }
}

export default FavoritoServicio;