class NombreHost {
    nombre = "";
    constructor() {
        if (window.location.hostname === "localhost") {
            this.nombre = "http://localhost";
        }else {
            this.nombre = "https://app.orisluciano.website";
        }
    }
}

export default NombreHost;