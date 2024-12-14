import LoginServicio from "../aplicacion/servicios/LoginServicio.js";
import BuscadorVista from "./BuscadorVista.js";
import MenuLoginVista from "./MenuLoginVista.js";
import MenuVista from "./MenuVista.js";

class InicioVista {
    loginService = new LoginServicio();

    constructor(parameters) {
        
    }

    iniciarApp(){
        this.cargarMenu();
        let buscador = new BuscadorVista();
        buscador.CargarVista();
    }

    cargarMenu(){
        let res = this.loginService.verificarLogueo();
        if (res.usuario === null) {
            let noLog = new MenuLoginVista();
            noLog.CargarVista();
        } else {
            console.log(res);
            let log = new MenuVista();
            log.CargarVista();
        }
    }
}

export default InicioVista;