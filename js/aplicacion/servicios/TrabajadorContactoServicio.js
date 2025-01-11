import PeticionesHttp from "../utiles/PeticionesHttp.js";

class TrabajadorContactoServicio {
    dir = "http://localhost/BackendLaburitoYa/api/trabajadorcontacto/";
    peticiones = new PeticionesHttp();
    
    constructor(parameters) {
        
    }

    NuevoTrabadorContacto(tc) {
        alert("No Implementado");
    }

    ModificarTrabajadorContacto(tc){
        alert("No Implementado");
    }

    EliminarTrabajadorContacto(id){
        alert("No Implementado");
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }

    BuscarPorId(id){
        alert("No Implementado");
    }

    async BuscarContactosPorTrabajador(trabajadorId){
        let dir = this.dir + "contactos/" + trabajadorId;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}
export default TrabajadorContactoServicio;