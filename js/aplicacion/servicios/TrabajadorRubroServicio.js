import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "./TokenServicio.js";

class TrabajadorRubroServicio {
    dir = "http://localhost/BackendLaburitoYa/api/trabajadorrubro";
    peticiones = new PeticionesHttp();
    tokenServicio = new TokenServicio();

    constructor(parameters) {
        
    }

    async NuevoTrabadorRubro(tr) {
        let base = await this.peticiones.peticionesVarias(this.dir, "POST", tr, this.tokenServicio.BearerToken());
        let json = await base;
        return json;
    }

    ModificarTrabajadorRubro(tr){
        alert("No Implementado");
    }

    async EliminarTrabajadorRubro(id){
        let dir = this.dir;
        let datos = { "id" : id };
        let base = await this.peticiones.peticionesVarias(dir, "DELETE", datos, this.tokenServicio.BearerToken());
        let json = await base;
        return json;
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

    async BuscarRubrosPorTrabajador(trabajadorId){
        let dir = this.dir + "/rubros/" + trabajadorId;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}

export default TrabajadorRubroServicio;