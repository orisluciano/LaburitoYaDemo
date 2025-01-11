import PeticionesHttp from "../utiles/PeticionesHttp";

class RubroServicio {
    dir = "http://localhost/BackendLaburitoYa/api/trabajador/";
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
        let dir = this.dir + id;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}

export default RubroServicio;