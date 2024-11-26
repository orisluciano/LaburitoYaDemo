import ModalBase from "./ModalBase.js";

class BuscadorVista {
    dir = "./html/buscador.html";
    ids = { txtRubro : "txtRubro",
        btnBuscar : "btnBuscar",
        tBody : "tBody"
    };
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

    buscar(){
        let txtRubro = document.getElementById(this.ids.txtRubro);
        this.cargarTabla(txtRubro.value);
    }

    async cargarDatos(rubro){
        let dir = "./recursos/datos/datos.json";
        let datos = await fetch(dir);
        let json =  await datos.json();
        return json;
    }

    async cargarTabla(rubro){
        let esto = this;
        let datos = await this.cargarDatos(rubro);
        let trabajadores = datos.trabajadores;  console.log(trabajadores);
        let tabla = document.getElementById(this.ids.tBody);
        tabla.innerHTML = "";
        trabajadores.forEach(e => {
            esto.crearFila(e, tabla);
        });
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
        nombre.innerHTML = datos.nombre;
        row.appendChild(nombre);
        let especialidades = document.createElement("td");
        especialidades.className = "width50";
        let esps = "";
        datos.rubros.forEach(e => {
            esps = esps + e;
        });
        especialidades.innerHTML = esps;
        row.appendChild(especialidades);
    }

    abrilModal(datos){
        console.log(datos);
        let modal = new ModalBase();
        modal.abrirModal();
        modal.llenarModal();
    }
}

export default BuscadorVista;