class ConfigUsuarioVista {
    dir = "./html/configUsuario.html";
    ids = {
        txtSugerencia : "txtSugerencia",
        btnEnviar : "btnEnviar"
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
        let btnEnviar = document.getElementById(this.ids.btnEnviar);
        btnEnviar.onclick = function() {
            esto.btnEnviarOnClick();
        }
    }

    btnEnviarOnClick(){
        let txtSugerencia = document.getElementById(this.ids.txtSugerencia);
        console.log(txtSugerencia.value);
        alert("Su sugerencia fue enviada. Muchas gracias");
    }
}
export default ConfigUsuarioVista;