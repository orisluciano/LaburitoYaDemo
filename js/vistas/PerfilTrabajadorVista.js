import RubroServicio from "../aplicacion/servicios/RubroServicio.js";
import TipoContactoServicio from "../aplicacion/servicios/TipoContactoServicio.js";
import TokenServicio from "../aplicacion/servicios/TokenServicio.js";
import TrabajadorContactoServicio from "../aplicacion/servicios/TrabajadorContactoServicio.js";
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
        divApiNom : "divApiNom",
        divModApiNom : "divModApiNom",
        divRubros : "divRubros",
        divModRubros : "divModRubros",
        btnModificarRubros : "btnModificarRubros",
        btnEditarRubros : "btnEditarRubros",
        btnCancelarRubros : "btnCancelarRubros",
        slcRubros : "slcRubros",
        divInputRubro : "divInputRubro",
        listaContactos : "listaContactos",
        slcContacto : "slcContacto",
        txtContacto : "txtContacto",
        btnEditarCon : "btnEditarCon",
        btnCancelarCon : "btnCancelarCon",
        btnModificarCon : "btnModificarCon",
        divModCon : "divModCon",
        divContacto : "divContacto",
        divInputContacto : "divInputContacto"
    };
    datos = {
        id : null,
        nombre : "",
        apellido : "",
        rubros : null,
        contactos : null
    };
    trabajadorService = new TrabajadorServicio();
    trabajadorUsuarioService = new TrabajadorUsuarioServicio();
    trabajadorRubroService = new TrabajadorRubroServicio();
    trabajadorContactoService = new TrabajadorContactoServicio();
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
        let btnModificarCon = document.getElementById(this.ids.btnModificarCon);
        btnModificarCon.onclick = function() {
            esto.btnModificarConOnClick();
        }
        let btnEditarCon = document.getElementById(this.ids.btnEditarCon);
        btnEditarCon.onclick = function() {
            esto.btnEditarConOnClick();
        }
        let btnCancelarCon = document.getElementById(this.ids.btnCancelarCon);
        btnCancelarCon.onclick = function() {
            esto.btnCancelarConClick();
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
                this.cargarContactos();
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

    async cargarContactos(){
        if (this.datos.id != null) {
            let base = await this.trabajadorContactoService.BuscarContactosPorTrabajador(this.datos.id);
            this.datos.contactos = base.respuesta.resultados;
            this.mostrarContactos(base.respuesta.resultados);
        }
    }

    mostrarContactos(contactos){
        let esto = this;
        let lista = [];
        let listaContactos = document.getElementById(this.ids.listaContactos);
        listaContactos.innerHTML = "";
        if (this.datos.id != null) {
            if (contactos.length > 0) {
                contactos.forEach(e => {
                    let r = document.createElement("li");
                    r.innerHTML = e.descripcion;
                    r.className = "displayFlex";
                    listaContactos.appendChild(r);
                    let btn = document.createElement("button");
                    btn.innerHTML = "Eliminar";
                    btn.className = "btnRelleno cabecera";
                    btn.id = "btnEliminarCon" + e.id;
                    lista.push(btn.id);
                    btn.style.display = "none";
                    btn.onclick = function() {
                        esto.btnEliminarConOnclick(e.id);
                    }
                    r.appendChild(btn);
                });
                this.listaBtnContactos = lista;
            } else {
                let r = document.createElement("li");
                    r.innerHTML = "No hay elementos para mostrar";
                    listaContactos.appendChild(r);
            }
        } else {
            let r = document.createElement("li");
            r.innerHTML = "Primero llene sus datos de trabajador";
            listaContactos.appendChild(r);
        }
    }

    async cargarTiposContactos(){
        let tipoServ = new TipoContactoServicio();
        let base = await tipoServ.Buscar(0,100);
        let select = document.getElementById(this.ids.slcContacto);
        select.innerHTML = "";
        if (base.errores.length === 0) {
            let tipos = base.respuesta.resultados;
            tipos.forEach(e => {
                let option = document.createElement("option");
                option.innerHTML = e.descripcion;
                option.value = e.id;
                select.appendChild(option);
            }
            );
        }
        let txtContacto = document.getElementById(this.ids.txtContacto);
        txtContacto.innerHTML = "";
        txtContacto.value = "";
    }

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
            alert("Hubo un error");
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
                alert("Hubo un error");
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

    btnModificarConOnClick(){
        let divCon = document.getElementById(this.ids.divContacto);
        divCon.className = "displayFlex";
        let divModCon = document.getElementById(this.ids.divModCon);
        divModCon.className = "displayNone";
        this.listaBtnContactos.forEach(e => {
            let btn = document.getElementById(e);
            btn.style.display = "";
        });
        let divInputCon = document.getElementById(this.ids.divInputContacto);
        divInputCon.className = "";
        this.cargarTiposContactos();
    }

    async btnEditarConOnClick(){
        let select = document.getElementById(this.ids.slcContacto);
        let txtContacto = document.getElementById(this.ids.txtContacto);
        let tc = {
            tipoContactoId : select.value,
            trabajadorId : this.datos.id,
            descripcion : txtContacto.value
        }
        let base = await this.trabajadorContactoService.NuevoTrabadorContacto(tc);
        let res = base.resultado;
        if (res.mensajes.length > 0) {
            alert(res.mensajes[0]);
            this.cargarContactos();
            this.btnCancelarConClick();
        } else {
            alert("Hubo un error");
        }   
        
    }

    async btnEliminarConOnclick(id){
        let mensaje = "Quiere eliminar este elemento?";
        if (confirm(mensaje)) {
            let base = await this.trabajadorContactoService.EliminarTrabajadorContacto(id);
            if (base.mensajes.length > 0) {
                alert(base.mensajes[0]);
                this.cargarContactos()
                this.btnCancelarConClick();
            } else {
                alert("Hubo un error");   
            }
        }
    }

    btnCancelarConClick(){
        let divCon = document.getElementById(this.ids.divContacto);
        divCon.className = "displayNone";
        let divModCon = document.getElementById(this.ids.divModCon);
        divModCon.className = "";
        this.listaBtnContactos.forEach(e => {
            let btn = document.getElementById(e);
            btn.style.display = "none";
        });
        let divInputCon = document.getElementById(this.ids.divInputContacto);
        divInputCon.className = "displayNone";
    }
}

export default PerfilTrabajadorVista;