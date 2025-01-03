class PeticionesHttp {
    respuesta = {
    }
    constructor() {
        
    }

    async peticionGet(dir, metodo) {
        try {
            let res = await fetch(dir,{
                method : metodo
            });
            let json = await res.json();
            console.log(json);
            this.respuesta = json;
        } catch (error) {
            this.respuesta.errores.push(error);
        }
        return this.respuesta;
    }

    async  peticionesVarias(dir, metodo, datos) {
        try {
            let res = await fetch(dir,{
                method : metodo,
                body : JSON.stringify(datos)
            });
            let json = await res.json();
            console.log(json);
            this.respuesta.resultado = json;
        } catch (error) {
            this.respuesta.errores.push(error);
        }
        return this.respuesta;
    }
}

export default PeticionesHttp;