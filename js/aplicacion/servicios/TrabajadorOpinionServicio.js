import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "./TokenServicio.js";

class TrabajadorOpinionServicio {
    dir = "http://localhost/BackendLaburitoYa/api/trabajadoropinion";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    async NuevoTrabadorOpinion(to) {
        let base = await this.peticiones.peticionesVarias(this.dir, "POST", to, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }

    ModificarTrabajadorOpinion(to){
        alert("No Implementado");
    }

    EliminarTrabajadorOpnion(id){
        alert("No Implementado");
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + "/" + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }

    BuscarPorId(id){
        alert("No Implementado");
    }

    async BuscarOpinionesPorTrabajador(trabajadorId, desde, cantidad){
        let dir = this.dir + "/opiniones/" + trabajadorId + "/" + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}
export default TrabajadorOpinionServicio;