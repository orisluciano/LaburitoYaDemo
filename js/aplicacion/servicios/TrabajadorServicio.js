import PeticionesHttp from "../utiles/PeticionesHttp.js";
import TokenServicio from "../servicios/TokenServicio.js";

class TrabajadorServicio {
    //dir = "./recursos/datos/datos.json";
    dir = "http://localhost/BackendLaburitoYa/api/trabajador";
    peticiones = new PeticionesHttp();
    tokenService = new TokenServicio();

    constructor(parameters) {
        
    }

    async nuevoTrabajador(trabajador) {
        let dir = this.dir;
        let base = await this.peticiones.post(dir, trabajador, this.tokenService.BearerToken());
        let json = await base;
        return json;
    }

    modificarTrabajador(trabajador){
        alert("Modificar");
        console.log(trabajador);
    }

    eliminarTrabajador(id){
        alert("No Implementado");
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }

    async buscarPorId(id){
        let dir = this.dir + "/" + id;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }

    buscarPorRubro(rubro){
        alert("No Implementado");

    }
}

export default TrabajadorServicio;