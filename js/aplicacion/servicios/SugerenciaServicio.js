import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "./TokenServicio.js";

class SugerenciaServicio {
    dir = "http://localhost/BackendLaburitoYa/api/sugerencia";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    async Nuevo(sugerencia) {
        sugerencia.userId = this.tokenService.parseJwt().userId;
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
        let dir = "http://localhost/BackendLaburitoYa/api/trabajador/" + id;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}

export default SugerenciaServicio;