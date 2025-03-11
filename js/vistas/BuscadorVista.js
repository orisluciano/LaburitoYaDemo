import RubroServicio from "../aplicacion/servicios/RubroServicio.js";
import TrabajadorServicio from "../aplicacion/servicios/TrabajadorServicio.js";
import ModalTrabajador from "./ModalTrabajador.js";

class BuscadorVista {
    dir = "./html/buscador.html";
    ids = { txtRubro : "txtRubro",
        btnBuscar : "btnBuscar",
        tBody : "tBody",
        slcRubroBuscador : "slcRubroBuscador",
        divPaginacion : "divPaginacion"
    };
    trabajadorService = new TrabajadorServicio();
    rubroService = new RubroServicio();

    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("root");
        root.innerHTML = "";
        root.innerHTML = await vista;
        this.cargarFunciones();
        this.cargarRubros();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscar = document.getElementById(this.ids.btnBuscar);
        btnBuscar.onclick = function() {
            esto.buscar(0);            
        }
    }

    async cargarRubros(){
        let rubros = await this.rubroService.Buscar(0,50);
        let slcRubroBuscador = document.getElementById(this.ids.slcRubroBuscador);
        let option = document.createElement("option");
        option.value = "";
        option.innerHTML = "";
        slcRubroBuscador.appendChild(option);
        rubros.respuesta.resultados.forEach(e => {
            let op = document.createElement("option");
            op.value = e.id;
            op.innerHTML = e.descripcion;
            slcRubroBuscador.appendChild(op);
        });
    }

    buscar(desde){
        let slcRubroBuscador = document.getElementById(this.ids.slcRubroBuscador);
        this.cargarTabla(slcRubroBuscador.value, desde, 10);
    }

    async cargarDatos(rubro, desde, cantidad){
        if (rubro === "") {
            return await this.trabajadorService.Buscar(desde,cantidad);   
        } else {
            return await this.trabajadorService.buscarPorRubro(desde, cantidad,rubro);
        }
    }

    async cargarTabla(rubro, desde, cantidad){
        let esto = this;
        let datos = await this.cargarDatos(rubro, desde, cantidad);
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
                this.cargarPaginacion(cantTrab, cantidad);    
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

    cargarPaginacion(cantTrabaj, cantMostrar){
        let esto = this;
        let divPaginacion = document.getElementById(this.ids.divPaginacion);
        divPaginacion.innerHTML = "";
        if(cantTrabaj > cantMostrar){
            let cantBtns = cantTrabaj / cantMostrar;
            for (let i = 0; i < cantBtns; i++) {
                let btn = document.createElement("button");
                btn.innerHTML = i+1;
                btn.className = "btnBuscar cursorPointer";
                btn.onclick = function() {
                    esto.buscar(i * cantMostrar);
                }
                divPaginacion.appendChild(btn);
            }
        }
    }
}

export default BuscadorVista;