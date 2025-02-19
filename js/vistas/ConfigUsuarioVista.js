class ConfigUsuarioVista {
    dir = "./html/configUsuario.html";
    ids = {
        txtUser : "txtUser",
        divPassOriginal : "divPassOriginal",
        txtPass : "txtPass",
        divNombre : "divNombre",
        btnNombre : "btnNombre",
        divBtnUser : "divBtnUser",
        btnCambiarNombre : "btnCambiarNombre",
        btnCancelarNombre : "btnCancelarNombre",
        divContraseña : "divContraseña",
        btnPass : "btnPass",
        txtNuevo : "txtNuevo",
        txtNuevo2 : "txtNuevo2",
        divBtnPass : "divBtnPass",
        btnCambiarPass : "btnCambiarPass",
        btnCancelarPass : "btnCancelarPass"
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
            esto.btnNombreOnClick();
        };
        let btnCambiarNombre = document.getElementById(this.ids.btnCambiarNombre);
        btnCambiarNombre.onclick = function() {
            esto.btnCambiarNombreOnclick();
        };
        let btnCancelarNombre = document.getElementById(this.ids.btnCancelarNombre);
        btnCancelarNombre.onclick = function() {
            esto.btnCancelarNombreOnClick();
        };
        let btnPass = document.getElementById(this.ids.btnPass);
        btnPass.onclick = function() {
            alert("");
        };
        let btnCambiarPass = document.getElementById(this.ids.btnCambiarPass);
        btnCambiarPass.onclick = function() {
            alert("");
        };
        let btnCancelarPass = document.getElementById(this.ids.btnCancelarPass);
        btnCancelarPass.onclick = function() {
            alert("");
        };
    }

    btnNombreOnClick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        txtUser.disabled = false;
        let divPassOriginal = document.getElementById(this.ids.divPassOriginal);
        divPassOriginal.className = "borderDivInput marginBotton20";
        let txtPass = document.getElementById(this.ids.txtPass);
        txtPass.innerHTML = "";
        let divBtnUser = document.getElementById(this.ids.divBtnUser);
        divBtnUser.className = "displayFlex marginBotton20";
        let divNombre = document.getElementById(this.ids.divNombre);
        divNombre.className = "displayNone";
    }

    btnCambiarNombreOnclick(){
        alert("");
    }

    btnCancelarNombreOnClick(){
        let txtUser = document.getElementById(this.ids.txtUser);
        txtUser.disabled = true;
        let divPassOriginal = document.getElementById(this.ids.divPassOriginal);
        divPassOriginal.className = "displayNone";
        let txtPass = document.getElementById(this.ids.txtPass);
        txtPass.innerHTML = "";
        let divBtnUser = document.getElementById(this.ids.divBtnUser);
        divBtnUser.className = "displayNone";
        let divNombre = document.getElementById(this.ids.divNombre);
        divNombre.className = "marginBotton20";
    }

    btnPassOnClick(){
        alert("");
    }

    btnCambiarPassOnclick(){
        alert("");
    }

    btnCancelarPassOnClick(){
        alert("");
    }
}
export default ConfigUsuarioVista;