class TrabajadorServicio {
    dir = "./recursos/datos/datos.json";

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
        let datos = await fetch(this.dir);
        let json =  await datos.json();
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