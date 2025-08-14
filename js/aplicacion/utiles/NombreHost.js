class NombreHost {
    nombre = "";
    constructor() {
        if (window.location.hostname === "localhost") {
            this.nombre = "http://localhost/backendlaburitoya/api/";
        }else {
            this.nombre = "https://app.orisluciano.website/backendlaburitoya/api/";
        }
    }
}

export default NombreHost;