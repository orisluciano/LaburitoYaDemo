import SugerenciaServicio from "../aplicacion/servicios/SugerenciaServicio.js";

class SugerenciaVista {
    dir = "./html/sugerencias.html";
    ids = {
        txtSugerencia : "txtSugerencia",
        btnEnviar : "btnEnviar"
    };
    servicio = new SugerenciaServicio();

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
        let btnEnviar = document.getElementById(this.ids.btnEnviar);
        btnEnviar.onclick = function() {
            esto.btnEnviarOnClick();
        }
    }

    async btnEnviarOnClick(){
        let txtSugerencia = document.getElementById(this.ids.txtSugerencia);
        console.log(txtSugerencia.value);
        let sugerencia = {
            descripcion : txtSugerencia.value
        }
        let resServ = await this.servicio.Nuevo(sugerencia);
        if (resServ.errores.length > 0) {
            alert(resServ.errores[0]);
        } else {
            alert(resServ.mensajes[0]);
        }
    }
}

export default SugerenciaVista;