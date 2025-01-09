import PeticionesHttp from "../utiles/PeticionesHttp.js";

class TrabajadorRubroServicio {
    dir = "http://localhost/BackendLaburitoYa/api/trabajadorrubro/";
    peticiones = new PeticionesHttp();
    constructor(parameters) {
        
    }

    NuevoTrabadorRubro(tr) {
        alert("No Implementado");
    }

    ModificarTrabajadorRubro(tr){
        alert("No Implementado");
    }

    EliminarTrabajadorRubro(id){
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

    async BuscarRubrosPorTrabajador(trabajadorId){
        let dir = this.dir + "rubros/" + trabajadorId;
        let base = await this.peticiones.peticionGet(dir, "GET");
        let json = await base;
        return json;
    }
}

export default TrabajadorRubroServicio;