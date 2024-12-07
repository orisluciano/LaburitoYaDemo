class PerfilTrabajadorVista {
    dir = "./html/perfilTrabajador.html";
    ids = { 
        btnBuscador : "btnBuscador",
        btnPublicar : "btnPublicar"
    };
    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("root");
        root.innerHTML = "";
        root.innerHTML = await vista;
        //this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscador = document.getElementById(this.ids.btnBuscador);
        btnBuscador.onclick = function() {
            esto.abrirBuscador();
        }
        let btnPublicar = document.getElementById(this.ids.btnPublicar);
        btnPublicar.onclick = function() {
            esto.abrirInicio();
        }
    }
}

export default PerfilTrabajadorVista;