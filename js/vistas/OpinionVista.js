class OpinionVista {
    dir = "./html/opinion.html";
    ids = {
        txtOpinion : "txtOpinion",
        slcCalif : "slcCalif",
        btnOpinar : "btnOpinar"
    }

    constructor(parameters) {
        
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

    btnOpinarOnClick(){
        let txtOpinion = document.getElementById(this.ids.txtOpinion);
        let opinion = txtOpinion.value;
        let slcCalif = document.getElementById(this.ids.slcCalif);
        alert(opinion + slcCalif.value);
    }
}

export default OpinionVista;