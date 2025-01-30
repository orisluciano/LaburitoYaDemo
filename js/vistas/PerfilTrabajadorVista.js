import RubroServicio from "../aplicacion/servicios/RubroServicio.js";
import TokenServicio from "../aplicacion/servicios/TokenServicio.js";
import TrabajadorRubroServicio from "../aplicacion/servicios/TrabajadorRubroServicio.js";
import TrabajadorServicio from "../aplicacion/servicios/TrabajadorServicio.js";
import TrabajadorUsuarioServicio from "../aplicacion/servicios/TrabajadorUsuarioServicio.js";

class PerfilTrabajadorVista {
    dir = "./html/perfilTrabajador.html";
    ids = {
        btnEditarApiNom : "btnEditarApiNom",
        btnCancelarApiNom : "btnCancelarApiNom",
        btnModificarApiNom : "btnModificarApiNom",
        btnNombre : "btnNombre",
        btnRubros : "btnRubros",
        btnZonas : "btnZonas",
        btnContactos : "btnContactos",
        txtNombre : "txtNombre",
        txtApellido : "txtApellido",
        listaRubros : "listaRubros",
        listaZonas : "listaZonas",
        listaContactos : "listaContactos",
        divApiNom : "divApiNom",
        divModApiNom : "divModApiNom",
        divRubros : "divRubros",
        divModRubros : "divModRubros",
        btnModificarRubros : "btnModificarRubros",
        btnEditarRubros : "btnEditarRubros",
        btnCancelarRubros : "btnCancelarRubros",
        slcRubros : "slcRubros",
        divInputRubro : "divInputRubro"
    };
    datos = {
        id : null,
        nombre : "",
        apellido : "",
        rubros : null
    };
    trabajadorService = new TrabajadorServicio();
    trabajadorUsuarioService = new TrabajadorUsuarioServicio();
    trabajadorRubroService = new TrabajadorRubroServicio();
    tokenService = new TokenServicio();
    listaBtnRubros = [];
    listaBtnContactos = [];

    constructor() {
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("root");
        root.innerHTML = "";
        root.innerHTML = await vista;
        this.cargarFunciones();
        this.cargarDatos();
    }

    async cargarDatos(){
        this.cargarTrabajador();
    }

    mostrarDatos(nombre, apellido){
        let txtNombre = document.getElementById(this.ids.txtNombre);
        txtNombre.value = nombre;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        txtApellido.value = apellido;
    }

    cargarFunciones(){
        let esto = this;
        let btnModificarApiNom = document.getElementById(this.ids.btnModificarApiNom);
        btnModificarApiNom.onclick = function() {
            esto.btnModificarApiNomOnClick();
        }
        let btnEditarApiNom = document.getElementById(this.ids.btnEditarApiNom);
        btnEditarApiNom.onclick = function() {
            esto.btnEditarApiNomOnClick();
        }
        let btnCancelarApiNom = document.getElementById(this.ids.btnCancelarApiNom);
        btnCancelarApiNom.onclick = function() {
            esto.btnCancelarrApiNomOnClick();
        }
        let btnModificarRubros = document.getElementById(this.ids.btnModificarRubros);
        btnModificarRubros.onclick = function() {
            esto.btnModificarRubroOnClick();
        }
        let btnEditarRubros = document.getElementById(this.ids.btnEditarRubros);
        btnEditarRubros.onclick = function() {
            esto.btnEditarRubroOnClick();
        }
        let btnCancelarRubroClick = document.getElementById(this.ids.btnCancelarRubros);
        btnCancelarRubroClick.onclick = function() {
            esto.btnCancelarRubroClick();
        }
        let btnNombre = document.getElementById(this.ids.btnNombre);
        btnNombre.onclick = function() {
            alert("proximamente");
        }
        let btnRubros = document.getElementById(this.ids.btnRubros);
        btnRubros.onclick = function() {
            alert("proximamente");
        }
        let btnZonas = document.getElementById(this.ids.btnZonas);
        btnZonas.onclick = function() {
            alert("proximamente");
        }
        let btnContactos = document.getElementById(this.ids.btnContactos);
        btnContactos.onclick = function() {
            alert("proximamanete");
        }
    }

    async cargarTrabajador(){
        let userId = this.tokenService.parseJwt().userId;
        let resServ = await this.trabajadorUsuarioService.buscarPorUsuarioId(userId);
        if (resServ.errores.length > 0) {
            let mensaje = "Hubo un error al cargar los datos del trabajador";
            this.mostrarDatos(mensaje, mensaje);
        } else {
            if (resServ.respuesta.resultados.length > 0) {
                let trabajadorUser = resServ.respuesta.resultados[0];
                let trabServ = await this.trabajadorService.buscarPorId(trabajadorUser.trabajadorId);
                let trabajador = trabServ.respuesta;
                this.datos.id = trabajadorUser.trabajadorId;
                this.mostrarDatos(trabajador.nombre, trabajador.apellido);
                this.cargarRubros();   
            } else {
                let btnModificarApiNom = document.getElementById(this.ids.btnModificarApiNom);
                btnModificarApiNom.innerHTML = "Crear trabajador";
            }
        }
    }

    async cargarRubros(){
        if (this.datos.id != null) {
            let base = await this.trabajadorRubroService.BuscarRubrosPorTrabajador(this.datos.id);
            this.datos.rubros = base.respuesta.resultados;
            this.mostrarRubros(base.respuesta.resultados);
        }
    }

    mostrarRubros(rubros){
        let esto = this;
        let lista = [];
        let listaRubros = document.getElementById(this.ids.listaRubros);
        listaRubros.innerHTML = "";
        if (this.datos.id != null) {
            if (rubros.length > 0) {
                rubros.forEach(e => {
                    let r = document.createElement("li");
                    r.innerHTML = e.descripcion;
                    r.className = "displayFlex";
                    listaRubros.appendChild(r);
                    let btn = document.createElement("button");
                    btn.innerHTML = "Eliminar";
                    btn.className = "btnRelleno cabecera";
                    btn.id = "btnEliminarRubro" + e.id;
                    lista.push(btn.id);
                    btn.style.display = "none";
                    btn.onclick = function() {
                        esto.btnEliminarRubro(e.id);
                    }
                    r.appendChild(btn);
                });
                this.listaBtnRubros = lista;
            } else {
                let r = document.createElement("li");
                    r.innerHTML = "No hay elementos para mostrar";
                    listaRubros.appendChild(r);
            }
        } else {
            let r = document.createElement("li");
            r.innerHTML = "Primero llene sus datos de trabajador";
            listaRubros.appendChild(r);
        }
    }

    cargarContactos(){}

    mostrarContactos(){}

    btnModificarApiNomOnClick(){
        let divApiNom = document.getElementById(this.ids.divApiNom);
        divApiNom.className = "displayFlex";
        let divModApiNom = document.getElementById(this.ids.divModApiNom);
        divModApiNom.className = "displayNone";
        let txtNombre = document.getElementById(this.ids.txtNombre);
        txtNombre.disabled = false;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        txtApellido.disabled = false;
    }

    async btnEditarApiNomOnClick(){
        let txtNombre = document.getElementById(this.ids.txtNombre);
        let nombre = txtNombre.value;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        let apellido = txtApellido.value;
        this.datos.apellido = apellido;
        this.datos.nombre = nombre;
        let res;
        if (this.datos.id === null) {
            res = await this.trabajadorService.nuevoTrabajador(this.datos);
        } else {
            res = await this.trabajadorService.modificarTrabajador(this.datos);
        }
        if (res.errores.length > 0) {
            res.errores.forEach(e => {
                alert(e);
            });
        } else {
            res.mensajes.forEach(e => {
                alert(e);
            });
            this.btnCancelarrApiNomOnClick();
        }
    }

    btnCancelarrApiNomOnClick(){
        let divApiNom = document.getElementById(this.ids.divApiNom);
        divApiNom.className = "displayNone";
        let divModApiNom = document.getElementById(this.ids.divModApiNom);
        divModApiNom.className = "";
        let txtNombre = document.getElementById(this.ids.txtNombre);
        txtNombre.disabled = true;
        let txtApellido = document.getElementById(this.ids.txtApellido);
        txtApellido.disabled = true;
    }

    btnModificarRubroOnClick(){
        let divRubro = document.getElementById(this.ids.divRubros);
        divRubro.className = "displayFlex";
        let divModRubros = document.getElementById(this.ids.divModRubros);
        divModRubros.className = "displayNone";
        this.listaBtnRubros.forEach(e => {
            let btn = document.getElementById(e);
            btn.style.display = "";
        });
        let divInputRubro = document.getElementById(this.ids.divInputRubro);
        divInputRubro.className = "";
        this.cargarOpcionesRubros();
    }

    async btnEditarRubroOnClick(){
        let select = document.getElementById(this.ids.slcRubros);
        let tr = {
            rubroId : select.value,
            trabajadorId : this.datos.id
        }
        let base = await this.trabajadorRubroService.NuevoTrabadorRubro(tr);
        if (base.mensajes.length > 0) {
            alert(base.mensajes[0]);
            this.cargarRubros();
            this.btnCancelarRubroClick();
        } else {
            
        }   
        
    }

    async btnEliminarRubro(id){
        let mensaje = "Quiere eliminar este elemento?";
        if (confirm(mensaje)) {
            let base = await this.trabajadorRubroService.EliminarTrabajadorRubro(id);
            if (base.mensajes.length > 0) {
                alert(base.mensajes[0]);
                this.cargarRubros();
                this.btnCancelarRubroClick();
            } else {
                
            }   
        }
    }

    btnCancelarRubroClick(){
        let divRubro = document.getElementById(this.ids.divRubros);
        divRubro.className = "displayNone";
        let divModRubros = document.getElementById(this.ids.divModRubros);
        divModRubros.className = "";
        this.listaBtnRubros.forEach(e => {
            let btn = document.getElementById(e);
            btn.style.display = "none";
        });
        let divInputRubro = document.getElementById(this.ids.divInputRubro);
        divInputRubro.className = "displayNone";
    }

    async cargarOpcionesRubros(){
        let select = document.getElementById(this.ids.slcRubros);
        select.innerHTML = "";
        let rubroServicio = new RubroServicio();
        let base = await rubroServicio.Buscar(0,100);
        if (base.errores > 0) {
            let op = document.createElement("option");
            op.innerHTML = "Hubo un error";
            select.appendChild(op);
        } else {
            let opcionesCargar = base.respuesta.resultados;
            opcionesCargar.forEach(e => {
                let aux = [];
                this.datos.rubros.forEach(r => {
                    if (r.rubroId === e.id) {
                        opcionesCargar = opcionesCargar.filter(f => r.rubroId !== f.id);
                    }
                });
            });
            opcionesCargar.forEach(e => {
                let op = document.createElement("option");
                op.innerHTML = e.descripcion;
                op.value = e.id;
                select.appendChild(op);
            });
        }
    }
}

export default PerfilTrabajadorVista;