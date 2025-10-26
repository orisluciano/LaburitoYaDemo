import FavoritoServicio from "../aplicacion/servicios/FavoritoServicio.js";
import RubroServicio from "../aplicacion/servicios/RubroServicio.js";
import TokenServicio from "../aplicacion/servicios/TokenServicio.js";
import TrabajadorServicio from "../aplicacion/servicios/TrabajadorServicio.js";
import ModalTrabajador from "./ModalTrabajador.js";

class FavoritosVista {
    dir = "./html/favoritos.html";
    ids = { txtRubro : "txtRubro",
        btnBuscar : "btnBuscar",
        tBody : "tBody",
        slcRubroBuscador : "slcRubroBuscador",
        divPaginacion : "divPaginacion"
    };
    favoritoService = new FavoritoServicio();
    tokenService = new TokenServicio();
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
        //this.cargarFunciones();
        this.cargarFavoritos();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscar = document.getElementById(this.ids.btnBuscar);
        btnBuscar.onclick = function() {
            esto.buscar(0,0);            
        }
    }

    async cargarFavoritos(){
        let userId = this.tokenService.parseJwt().userId;
        let favs = await this.favoritoService.buscarPorUsuario(userId);
        this.cargarTabla(favs);
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

    buscar(desde, index){
        let slcRubroBuscador = document.getElementById(this.ids.slcRubroBuscador);
        this.cargarTabla(slcRubroBuscador.value, desde, 10, index);
    }

    async cargarDatos(rubro, desde, cantidad){
        if (rubro === "") {
            return await this.trabajadorService.Buscar(desde,cantidad);   
        } else {
            return await this.trabajadorService.buscarPorRubro(desde, cantidad,rubro);
        }
    }

    async cargarTabla(datos){
        let esto = this;
        //let datos = await this.cargarDatos(rubro, desde, cantidad);
        if (datos.errores.length > 0) {
            alert("Hubo un error. Intente de nuevo");
        } else {
            //let cantTrab = datos.respuesta.cantidad;
            if (datos.respuesta.resultados.length > 0) {
                let favs = datos.respuesta.resultados;
                let tabla = document.getElementById(this.ids.tBody);
                tabla.innerHTML = "";
                favs.forEach(e => {
                    esto.crearFila(e, tabla);
                });
                //this.cargarPaginacion(cantTrab, cantidad, index);    
            } else {
                alert("Todavia no hay favoritos");
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
        let etiqueta = document.createElement("td");
        etiqueta.className = "width50";
        etiqueta.innerHTML = datos.etiqueta;
        row.appendChild(etiqueta);
    }

    abrilModal(datos){
        console.log(datos);
        let modal = new ModalTrabajador(datos)
        modal.cargarVista();
    }

    cargarPaginacion(cantTrabaj, cantMostrar, index){
        let esto = this;
        let divPaginacion = document.getElementById(this.ids.divPaginacion);
        divPaginacion.innerHTML = "";
        if(cantTrabaj > cantMostrar){
            let cantBtns = cantTrabaj / cantMostrar;
            for (let i = 0; i < cantBtns; i++) {
                let btn = document.createElement("button");
                btn.innerHTML = i+1;
                if (index === i) {
                    btn.className = "btnSeleccionado";
                    btn. disabled = true;
                } else {
                    btn.className = "btnBuscar cursorPointer";
                }
                btn.onclick = function() {
                    esto.buscar(i * cantMostrar, i);
                }
                divPaginacion.appendChild(btn);
            }
        }
    }
}

export default FavoritosVista;