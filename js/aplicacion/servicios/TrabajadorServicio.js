import PeticionesHttp from "../ultiles/PeticionesHttp.js";

class TrabajadorServicio {
    //dir = "./recursos/datos/datos.json";
    dir = "http://localhost/BackendLaburitoYa/api/trabajador/";
    peticiones = new PeticionesHttp();

    constructor(parameters) {
        
    }

    NuevoTrabador(trabajador) {
        alert("No Implementado");
    }

    ModificarTrabajador(trabajador){
        alert("No Implementado");
    }

    EliminarTrabajador(id){
        alert("No Implementado");
    }

    async Buscar(desde, cantidad){
        let dir = this.dir + desde + "/" + cantidad;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        //let datos = await fetch(this.dir);
        //let json =  await datos.json();
        return json;
    }

    BuscarPorId(id){
        alert("No Implementado");
    }

    BuscarPorRubro(rubro){
        alert("No Implementado");

    }
}

export default TrabajadorServicio;