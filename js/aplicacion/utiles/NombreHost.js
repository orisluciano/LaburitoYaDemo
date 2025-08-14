class NombreHost {
    nombre = "";
    constructor() {
        if (window.location.hostname === "localhost") {
            this.nombre = "localhost";
        }else {
            this.nombre = "orisluciano.website";
        }
    }
}