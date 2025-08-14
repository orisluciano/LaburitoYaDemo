class NombreHost {
    nombre = "";
    constructor() {
        if (window.location.hostname === "localhost") {
            this.nombre = "http://localhost";
        }else {
            this.nombre = "orisluciano.website";
        }
    }
}

export default NombreHost;