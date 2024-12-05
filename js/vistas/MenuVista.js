class MenuVista {
    dir = "./html/menu.html";
    ids = { 
        txtUser : "txtUser",
        txtPass : "txtPass",
        btnConfig : "btnConfig",
        btnsalir : "btnSalir",
        contenidoMenu : "contenidoMenu",
        divMenu : "divMenu"
    };
    constructor(parameters) {
        
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let menu = document.getElementById(this.ids.contenidoMenu);
        menu.innerHTML = "";
        menu.innerHTML = await vista;
        let div = document.getElementById(this.ids.divMenu);
        div.className = "divMenu dropdown";
        //this.cargarFunciones();
    }

    cargarFunciones(){
        let esto = this;
        let btnBuscar = document.getElementById(this.ids.btnBuscar);
        btnBuscar.onclick = function() {
            esto.buscar();            
        }
    }
}

export default MenuVista;