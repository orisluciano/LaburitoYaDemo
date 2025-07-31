import TrabajadorOpinionServicio from "../aplicacion/servicios/TrabajadorOpinionServicio.js";

class OpinionVista {
    dir = "./html/opinion.html";
    ids = {
        txtOpinion : "txtOpinion",
        slcCalif : "slcCalif",
        btnOpinar : "btnOpinar"
    }
    trabajadorOpinion = {
        usuarioId : null,
        trabajadorId : null,
        calificacion : null,
        opinion : null
    }
    opinionServicio = new TrabajadorOpinionServicio();

    constructor(usuarioId, trabajadorId) {
        this.trabajadorOpinion.usuarioId = usuarioId;
        this.trabajadorOpinion.trabajadorId = trabajadorId;
    }

    async CargarVista() {
        let res = await fetch(this.dir);
        let vista = await res.text();
        let root = document.getElementById("divOpiniones");
        root.innerHTML = "";
        root.innerHTML = await vista;
        this.cargarBotones();
    }

    cargarBotones(){
        let esto = this;
        let btnOpinar = document.getElementById(this.ids.btnOpinar);
        btnOpinar.onclick = function() {
            esto.btnOpinarOnClick();
        }
    }

    async btnOpinarOnClick(){
        let txtOpinion = document.getElementById(this.ids.txtOpinion);
        let opinion = txtOpinion.value;
        let slcCalif = document.getElementById(this.ids.slcCalif);
        this.trabajadorOpinion.opinion = opinion;
        this.trabajadorOpinion.calificacion = slcCalif.value;
        let base = await this.opinionServicio.NuevoTrabadorOpinion(this.trabajadorOpinion);
        if (base.mensajes.length > 0) {
            base.mensajes.forEach(e => {
                alert(e);
            });
        }else{
            base.errores.forEach(e => {
                alert(e);
            });
        }
    }
}

export default OpinionVista;