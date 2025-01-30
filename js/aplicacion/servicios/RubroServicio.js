import PeticionesHttp from "../utiles/PeticionesHttp.js";

class RubroServicio {
    dir = "http://localhost/BackendLaburitoYa/api/rubro/";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    NuevoRubro(rubro) {
        alert("No Implementado");
    }

    ModificarRubro(rubro){
        alert("No Implementado");
    }

    EliminarRubro(id){
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

export default RubroServicio;