class PerfilTrabajadorVista {
    dir = "./html/perfilTrabajador.html";
    ids = {
        btnNombre : "btnNombre",
        btnRubros : "btnRubros",
        btnZonas : "btnZonas",
        btnContactos : "btnContactos",
        txtNombre : "txtNombre"
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
}

export default PerfilTrabajadorVista;