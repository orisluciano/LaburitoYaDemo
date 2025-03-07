import TrabajadorServicio from "../aplicacion/servicios/TrabajadorServicio.js";
import ModalTrabajador from "./ModalTrabajador.js";

class BuscadorVista {
    dir = "./html/buscador.html";
    ids = { txtRubro : "txtRubro",
        btnBuscar : "btnBuscar",
        tBody : "tBody"
    };
    trabajadorService = new TrabajadorServicio();

    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("root");
        root.innerHTML = "";
        root.innerHTML = await vista;
        this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscar = document.getElementById(this.ids.btnBuscar);
        btnBuscar.onclick = function() {
            esto.buscar();            
        }
    }

    cargarMenu(){
        
    }

    buscar(){
        let txtRubro = document.getElementById(this.ids.txtRubro);
        this.cargarTabla(txtRubro.value);
    }

    async cargarDatos(rubro){
        return await this.trabajadorService.Buscar(0,10);;
    }

    async cargarTabla(rubro){
        let esto = this;
        let datos = await this.cargarDatos(rubro);
        if (datos.errores.length > 0) {
            alert("Hubo un error. Intente de nuevo");
        } else {
            let cantTrab = datos.respuesta.cantidad;
            if (datos.respuesta.cantidad > 0) {
                let trabajadores = datos.respuesta.resultados;
                let tabla = document.getElementById(this.ids.tBody);
                tabla.innerHTML = "";
                trabajadores.forEach(e => {
                    esto.crearFila(e, tabla);
                });    
            } else {
                alert("No se encontraron trabajadores");
            }
               
        }
    }

    crearFila(datos, padre){
        let esto = this
        let row = document.createElement("tr");
        row.className = "borderTopSolid colorFilaTabla cursorPointer";
        row.onclick = function(params) {
            esto.abrilModal(datos);
        }
        padre.appendChild(row);
        let nombre = document.createElement("td");
        nombre.className = "width50";
        nombre.innerHTML = datos.nombre + " " + datos.apellido;
        row.appendChild(nombre);
        let especialidades = document.createElement("td");
        especialidades.className = "width50";
        /*let esps = "";
        datos.rubros.forEach(e => {
            esps = esps + e;
        });
        especialidades.innerHTML = esps;
        row.appendChild(especialidades);*/
    }

    abrilModal(datos){
        console.log(datos);
        let modal = new ModalTrabajador(datos)
        modal.cargarVista();
    }
}

export default BuscadorVista;